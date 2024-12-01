import { Request, Response, NextFunction } from 'express';
import Chat from '../models/Chat';
import User from '../models/User';
import { AppError } from '../middleware/errorHandler';

export const getUserChats = async (req: Request, res: Response, next: NextFunction) => {
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
};

export const getChatById = async (req: Request, res: Response, next: NextFunction) => {
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

    res.json(chat);
  } catch (error) {
    next(error);
  }
};

export const createMessage = async (req: Request, res: Response, next: NextFunction) => {
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
};
