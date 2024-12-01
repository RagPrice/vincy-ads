import { Server as HttpServer } from 'http';
import { Server, Socket } from 'socket.io';
import { auth } from '../config/firebase';
import Chat from '../models/Chat';
import User from '../models/User';
import { createNotification } from '../controllers/notificationController';

interface UserSocket extends Socket {
  userId?: string;
}

export class SocketService {
  private io: Server;
  private userSockets: Map<string, Set<string>> = new Map();

  constructor(server: HttpServer) {
    this.io = new Server(server, {
      cors: {
        origin: process.env.CLIENT_URL || 'http://localhost:5173',
        methods: ['GET', 'POST'],
        credentials: true
      }
    });

    this.setupMiddleware();
    this.setupEventHandlers();
  }

  private setupMiddleware() {
    this.io.use(async (socket: UserSocket, next) => {
      try {
        const token = socket.handshake.auth.token;
        if (!token) {
          throw new Error('Authentication token missing');
        }

        const decodedToken = await auth.verifyIdToken(token);
        socket.userId = decodedToken.uid;
        next();
      } catch (error) {
        next(new Error('Authentication failed'));
      }
    });
  }

  private setupEventHandlers() {
    this.io.on('connection', (socket: UserSocket) => {
      if (!socket.userId) return;

      this.handleUserConnection(socket);

      socket.on('disconnect', () => {
        this.handleUserDisconnection(socket);
      });

      socket.on('join:chat', (chatId: string) => {
        socket.join(`chat:${chatId}`);
      });

      socket.on('leave:chat', (chatId: string) => {
        socket.leave(`chat:${chatId}`);
      });

      socket.on('message:send', async (data: {
        chatId: string;
        content: string;
      }) => {
        await this.handleNewMessage(socket, data);
      });

      socket.on('typing:start', (chatId: string) => {
        socket.to(`chat:${chatId}`).emit('typing:start', {
          chatId,
          userId: socket.userId
        });
      });

      socket.on('typing:stop', (chatId: string) => {
        socket.to(`chat:${chatId}`).emit('typing:stop', {
          chatId,
          userId: socket.userId
        });
      });
    });
  }

  private handleUserConnection(socket: UserSocket) {
    if (!socket.userId) return;

    // Add socket to user's socket set
    if (!this.userSockets.has(socket.userId)) {
      this.userSockets.set(socket.userId, new Set());
    }
    this.userSockets.get(socket.userId)?.add(socket.id);

    // Notify user's contacts that they're online
    this.io.emit('user:online', socket.userId);
  }

  private handleUserDisconnection(socket: UserSocket) {
    if (!socket.userId) return;

    // Remove socket from user's socket set
    const userSockets = this.userSockets.get(socket.userId);
    if (userSockets) {
      userSockets.delete(socket.id);
      if (userSockets.size === 0) {
        this.userSockets.delete(socket.userId);
        // Notify user's contacts that they're offline
        this.io.emit('user:offline', socket.userId);
      }
    }
  }

  private async handleNewMessage(socket: UserSocket, data: {
    chatId: string;
    content: string;
  }) {
    try {
      if (!socket.userId) return;

      const chat = await Chat.findById(data.chatId)
        .populate('participants', 'name');

      if (!chat) {
        socket.emit('error', { message: 'Chat not found' });
        return;
      }

      // Check if user is participant
      if (!chat.participants.some(p => p.id === socket.userId)) {
        socket.emit('error', { message: 'Not authorized to send messages in this chat' });
        return;
      }

      const sender = await User.findOne({ uid: socket.userId });
      if (!sender) {
        socket.emit('error', { message: 'User not found' });
        return;
      }

      // Add message to chat
      const message = {
        sender: sender._id,
        content: data.content,
        createdAt: new Date(),
        read: false
      };

      chat.messages.push(message);
      chat.lastMessage = message;
      await chat.save();

      // Emit message to all participants in the chat
      this.io.to(`chat:${data.chatId}`).emit('message:new', {
        chatId: data.chatId,
        message: {
          ...message,
          sender: {
            _id: sender._id,
            name: sender.name,
            picture: sender.picture
          }
        }
      });

      // Create notifications for other participants
      const otherParticipants = chat.participants.filter(p => p.id !== socket.userId);
      for (const participant of otherParticipants) {
        await createNotification(
          participant.id,
          'new_message',
          'New Message',
          `${sender.name} sent you a message`,
          {
            chatId: chat._id,
            senderId: sender._id,
            messagePreview: data.content.substring(0, 50)
          }
        );
      }
    } catch (error) {
      console.error('Error handling new message:', error);
      socket.emit('error', { message: 'Failed to send message' });
    }
  }

  // Utility method to check if a user is online
  public isUserOnline(userId: string): boolean {
    return this.userSockets.has(userId);
  }

  // Utility method to get user's active socket count
  public getUserSocketCount(userId: string): number {
    return this.userSockets.get(userId)?.size || 0;
  }

  // Utility method to emit event to specific user
  public emitToUser(userId: string, event: string, data: any) {
    const userSockets = this.userSockets.get(userId);
    if (userSockets) {
      userSockets.forEach(socketId => {
        this.io.to(socketId).emit(event, data);
      });
    }
  }
}
