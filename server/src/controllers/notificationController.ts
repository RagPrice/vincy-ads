import { Request, Response, NextFunction } from 'express';
import Notification from '../models/Notification';
import User from '../models/User';
import { AppError } from '../middleware/errorHandler';

export const getNotifications = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await User.findOne({ uid: req.user!.uid });
    if (!user) {
      throw new AppError('User not found', 404);
    }

    const { page = 1, limit = 20, unreadOnly = false } = req.query;
    const query: any = { userId: user._id };

    if (unreadOnly === 'true') {
      query.read = false;
    }

    const notifications = await Notification.find(query)
      .sort('-createdAt')
      .skip((Number(page) - 1) * Number(limit))
      .limit(Number(limit));

    const total = await Notification.countDocuments(query);
    const unreadCount = await Notification.countDocuments({ 
      userId: user._id,
      read: false
    });

    res.json({
      notifications,
      total,
      unreadCount,
      pages: Math.ceil(total / Number(limit)),
      currentPage: Number(page)
    });
  } catch (error) {
    next(error);
  }
};

export const markAsRead = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await User.findOne({ uid: req.user!.uid });
    if (!user) {
      throw new AppError('User not found', 404);
    }

    const { notificationIds } = req.body;
    
    if (!Array.isArray(notificationIds)) {
      throw new AppError('notificationIds must be an array', 400);
    }

    await Notification.updateMany(
      {
        _id: { $in: notificationIds },
        userId: user._id
      },
      { read: true }
    );

    res.json({ message: 'Notifications marked as read' });
  } catch (error) {
    next(error);
  }
};

export const markAllAsRead = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await User.findOne({ uid: req.user!.uid });
    if (!user) {
      throw new AppError('User not found', 404);
    }

    await Notification.updateMany(
      { userId: user._id },
      { read: true }
    );

    res.json({ message: 'All notifications marked as read' });
  } catch (error) {
    next(error);
  }
};

export const deleteNotification = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await User.findOne({ uid: req.user!.uid });
    if (!user) {
      throw new AppError('User not found', 404);
    }

    const notification = await Notification.findOneAndDelete({
      _id: req.params.notificationId,
      userId: user._id
    });

    if (!notification) {
      throw new AppError('Notification not found', 404);
    }

    res.status(204).send();
  } catch (error) {
    next(error);
  }
};

// Utility function to create notifications (used internally)
export const createNotification = async (
  userId: string,
  type: string,
  title: string,
  message: string,
  data?: Record<string, any>
) => {
  const notification = new Notification({
    userId,
    type,
    title,
    message,
    data
  });

  await notification.save();
  return notification;
};
