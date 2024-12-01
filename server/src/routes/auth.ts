import express from 'express';
import { authenticate } from '../middleware/auth';
import User from '../models/User';
import { AppError } from '../middleware/errorHandler';
import { auth } from '../config/firebase';

const router = express.Router();

// Register or update user after Firebase authentication
router.post('/register', authenticate, async (req, res, next) => {
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
});

// Verify authentication status
router.get('/verify', authenticate, async (req, res) => {
  res.json({ 
    authenticated: true, 
    user: req.user 
  });
});

// Delete account
router.delete('/account', authenticate, async (req, res, next) => {
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
});

export default router;
