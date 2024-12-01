import express from 'express';
import { authenticate } from '../middleware/auth';
import Chat from '../models/Chat';
import User from '../models/User';
import { AppError } from '../middleware/errorHandler';

const router = express.Router();

// Get user's chats
router.get('/', authenticate, async (req, res, next) => {
  try {
    const user = await User.findOne({ uid: req.user!.uid });
    if (!user) {
      throw new AppError('User not found', 404);
    }

    const chats = await Chat.find({ participants: user._id })
      .populate('participants', 'name picture')
      .populate('listingId', 'title images')
      .sort('-updatedAt');

    res.json(chats);
  } catch (error) {
    next(error);
  }
});

// Get single chat
router.get('/:chatId', authenticate, async (req, res, next) => {
  try {
    const user = await User.findOne({ uid: req.user!.uid });
    if (!user) {
      throw new AppError('User not found', 404);
    }

    const chat = await Chat.findOne({
      _id: req.params.chatId,
      participants: user._id
    })
      .populate('participants', 'name picture')
      .populate('listingId', 'title images');

    if (!chat) {
      throw new AppError('Chat not found', 404);
    }

    // Mark messages as read
    chat.messages.forEach(message => {
      if (message.sender.toString() !== user._id.toString()) {
        message.read = true;
      }
    });
    await chat.save();

    res.json(chat);
  } catch (error) {
    next(error);
  }
});

// Start new chat
router.post('/listing/:listingId', authenticate, async (req, res, next) => {
  try {
    const user = await User.findOne({ uid: req.user!.uid });
    if (!user) {
      throw new AppError('User not found', 404);
    }

    // Check if chat already exists
    const existingChat = await Chat.findOne({
      listingId: req.params.listingId,
      participants: { $all: [user._id, req.body.sellerId] }
    });

    if (existingChat) {
      return res.json(existingChat);
    }

    // Create new chat
    const chat = new Chat({
      listingId: req.params.listingId,
      participants: [user._id, req.body.sellerId],
      messages: [{
        sender: user._id,
        content: req.body.message
      }]
    });

    chat.lastMessage = chat.messages[0];
    await chat.save();

    const populatedChat = await chat
      .populate('participants', 'name picture')
      .populate('listingId', 'title images');

    res.status(201).json(populatedChat);
  } catch (error) {
    next(error);
  }
});

// Send message
router.post('/:chatId/messages', authenticate, async (req, res, next) => {
  try {
    const user = await User.findOne({ uid: req.user!.uid });
    if (!user) {
      throw new AppError('User not found', 404);
    }

    const chat = await Chat.findOne({
      _id: req.params.chatId,
      participants: user._id
    });

    if (!chat) {
      throw new AppError('Chat not found', 404);
    }

    const message = {
      sender: user._id,
      content: req.body.message,
      createdAt: new Date(),
      read: false
    };

    chat.messages.push(message);
    chat.lastMessage = message;
    await chat.save();

    res.status(201).json(message);
  } catch (error) {
    next(error);
  }
});

export default router;
