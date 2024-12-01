import { Request, Response, NextFunction } from 'express';
import User from '../models/User';
import { AppError } from '../middleware/errorHandler';
import { auth } from '../config/firebase';

export const registerUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    let user = await User.findOne({ uid: req.user!.uid });

    if (user) {
      // Update existing user
      Object.assign(user, {
        email: req.user!.email,
        ...req.body
      });
    } else {
      // Create new user
      user = new User({
        uid: req.user!.uid,
        email: req.user!.email,
        ...req.body
      });
    }

    await user.save();
    res.status(201).json(user);
  } catch (error) {
    next(error);
  }
};

export const verifyAuth = async (req: Request, res: Response) => {
  res.json({ 
    authenticated: true, 
    user: req.user 
  });
};

export const deleteAccount = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await User.findOneAndDelete({ uid: req.user!.uid });
    if (!user) {
      throw new AppError('User not found', 404);
    }

    // Delete user from Firebase
    await auth.deleteUser(req.user!.uid);

    res.status(204).send();
  } catch (error) {
    next(error);
  }
};

export const refreshToken = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { refreshToken } = req.body;
    if (!refreshToken) {
      throw new AppError('Refresh token is required', 400);
    }

    // Verify the refresh token with Firebase Admin SDK
    const decodedToken = await auth.verifyIdToken(refreshToken);
    
    // Generate a new ID token
    const user = await auth.getUser(decodedToken.uid);
    const customToken = await auth.createCustomToken(user.uid);

    res.json({ token: customToken });
  } catch (error) {
    next(error);
  }
};
