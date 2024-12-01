import { Request, Response, NextFunction } from 'express';
import Review from '../models/Review';
import User from '../models/User';
import Listing from '../models/Listing';
import { AppError } from '../middleware/errorHandler';

export const createReview = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const reviewer = await User.findOne({ uid: req.user!.uid });
    if (!reviewer) {
      throw new AppError('User not found', 404);
    }

    const listing = await Listing.findById(req.params.listingId);
    if (!listing) {
      throw new AppError('Listing not found', 404);
    }

    const reviewee = await User.findById(listing.userId);
    if (!reviewee) {
      throw new AppError('Seller not found', 404);
    }

    // Check if user has already reviewed this listing
    const existingReview = await Review.findOne({
      reviewer: reviewer._id,
      listing: listing._id
    });

    if (existingReview) {
      throw new AppError('You have already reviewed this listing', 400);
    }

    const review = new Review({
      reviewer: reviewer._id,
      reviewee: reviewee._id,
      listing: listing._id,
      rating: req.body.rating,
      comment: req.body.comment
    });

    await review.save();

    // Update user's average rating
    const userReviews = await Review.find({ reviewee: reviewee._id });
    const totalRating = userReviews.reduce((sum, review) => sum + review.rating, 0);
    const averageRating = totalRating / userReviews.length;

    reviewee.rating = Math.round(averageRating * 10) / 10;
    reviewee.reviewCount = userReviews.length;
    await reviewee.save();

    await review.populate([
      { path: 'reviewer', select: 'name picture' },
      { path: 'listing', select: 'title' }
    ]);

    res.status(201).json(review);
  } catch (error) {
    next(error);
  }
};

export const getUserReviews = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) {
      throw new AppError('User not found', 404);
    }

    const reviews = await Review.find({ reviewee: user._id })
      .populate('reviewer', 'name picture')
      .populate('listing', 'title')
      .sort('-createdAt');

    res.json(reviews);
  } catch (error) {
    next(error);
  }
};

export const getListingReviews = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const listing = await Listing.findById(req.params.listingId);
    if (!listing) {
      throw new AppError('Listing not found', 404);
    }

    const reviews = await Review.find({ listing: listing._id })
      .populate('reviewer', 'name picture')
      .sort('-createdAt');

    res.json(reviews);
  } catch (error) {
    next(error);
  }
};

export const updateReview = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const reviewer = await User.findOne({ uid: req.user!.uid });
    if (!reviewer) {
      throw new AppError('User not found', 404);
    }

    const review = await Review.findOne({
      _id: req.params.reviewId,
      reviewer: reviewer._id
    });

    if (!review) {
      throw new AppError('Review not found or unauthorized', 404);
    }

    // Only allow updating rating and comment
    review.rating = req.body.rating ?? review.rating;
    review.comment = req.body.comment ?? review.comment;
    await review.save();

    // Update user's average rating
    const userReviews = await Review.find({ reviewee: review.reviewee });
    const totalRating = userReviews.reduce((sum, review) => sum + review.rating, 0);
    const averageRating = totalRating / userReviews.length;

    const reviewee = await User.findById(review.reviewee);
    if (reviewee) {
      reviewee.rating = Math.round(averageRating * 10) / 10;
      await reviewee.save();
    }

    await review.populate([
      { path: 'reviewer', select: 'name picture' },
      { path: 'listing', select: 'title' }
    ]);

    res.json(review);
  } catch (error) {
    next(error);
  }
};
