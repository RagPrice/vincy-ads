import express from 'express';
import { authenticate } from '../middleware/auth';
import User from '../models/User';
import { AppError } from '../middleware/errorHandler';

const router = express.Router();

// Get user profile
router.get('/profile', authenticate, async (req, res, next) => {
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
});

// Update user profile
router.patch('/profile', authenticate, async (req, res, next) => {
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
});

// Get user's listings
router.get('/listings', authenticate, async (req, res, next) => {
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
});

// Get user's favorite listings
router.get('/favorites', authenticate, async (req, res, next) => {
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
});

// Add listing to favorites
router.post('/favorites/:listingId', authenticate, async (req, res, next) => {
  try {
    const user = await User.findOne({ uid: req.user!.uid });
    if (!user) {
      throw new AppError('User not found', 404);
    }

    if (!user.favorites.includes(req.params.listingId)) {
      user.favorites.push(req.params.listingId);
      await user.save();
    }

    res.json({ message: 'Listing added to favorites' });
  } catch (error) {
    next(error);
  }
});

// Remove listing from favorites
router.delete('/favorites/:listingId', authenticate, async (req, res, next) => {
  try {
    const user = await User.findOne({ uid: req.user!.uid });
    if (!user) {
      throw new AppError('User not found', 404);
    }

    user.favorites = user.favorites.filter(
      id => id.toString() !== req.params.listingId
    );
    await user.save();

    res.json({ message: 'Listing removed from favorites' });
  } catch (error) {
    next(error);
  }
});

export default router;
