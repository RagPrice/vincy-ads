import { Request, Response, NextFunction } from 'express';
import User from '../models/User';
import { AppError } from '../middleware/errorHandler';

export const getProfile = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await User.findOne({ uid: req.user!.uid })
      .populate('listings')
      .select('-__v');

    if (!user) {
      throw new AppError('User not found', 404);
    }

    res.json(user);
  } catch (error) {
    next(error);
  }
};

export const updateProfile = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await User.findOne({ uid: req.user!.uid });

    if (!user) {
      throw new AppError('User not found', 404);
    }

    const allowedUpdates = ['name', 'phone', 'location', 'picture'];
    const updates = Object.keys(req.body);
    const isValidOperation = updates.every(update => allowedUpdates.includes(update));

    if (!isValidOperation) {
      throw new AppError('Invalid updates', 400);
    }

    Object.assign(user, req.body);
    await user.save();

    res.json(user);
  } catch (error) {
    next(error);
  }
};

export const getUserListings = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await User.findOne({ uid: req.user!.uid });
    if (!user) {
      throw new AppError('User not found', 404);
    }

    const listings = await user.populate({
      path: 'listings',
      options: { sort: { createdAt: -1 } }
    });

    res.json(listings);
  } catch (error) {
    next(error);
  }
};

export const getFavorites = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await User.findOne({ uid: req.user!.uid });
    if (!user) {
      throw new AppError('User not found', 404);
    }

    const favorites = await user.populate({
      path: 'favorites',
      options: { sort: { createdAt: -1 } }
    });

    res.json(favorites);
  } catch (error) {
    next(error);
  }
};
