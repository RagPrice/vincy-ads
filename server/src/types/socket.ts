import { Socket } from 'socket.io';

export interface ChatMessage {
  chatId: string;
  content: string;
}

export interface UserSocket extends Socket {
  userId?: string;
}

export interface ChatEvent {
  chatId: string;
  userId: string;
}

export interface MessageEvent {
  chatId: string;
  message: {
    sender: {
      _id: string;
      name: string;
      picture?: string;
    };
    content: string;
    createdAt: Date;
    read: boolean;
  };
}
