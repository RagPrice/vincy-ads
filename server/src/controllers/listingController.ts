import { Request, Response, NextFunction } from 'express';
import Listing from '../models/Listing';
import { AppError } from '../middleware/errorHandler';
import { uploadImage, deleteImage } from '../utils/upload';

export const getListings = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const {
      category,
      subcategory,
      condition,
      minPrice,
      maxPrice,
      sort = '-createdAt',
      page = 1,
      limit = 20,
    } = req.query;

    const query: any = {};
    
    if (category) query.category = category;
    if (subcategory) query.subcategory = subcategory;
    if (condition) query.condition = condition;
    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = Number(minPrice);
      if (maxPrice) query.price.$lte = Number(maxPrice);
    }

    const listings = await Listing.find(query)
      .sort(sort)
      .skip((Number(page) - 1) * Number(limit))
      .limit(Number(limit))
      .populate('userId', 'name picture rating');

    const total = await Listing.countDocuments(query);

    res.json({
      listings,
      total,
      pages: Math.ceil(total / Number(limit)),
      currentPage: Number(page),
    });
  } catch (error) {
    next(error);
  }
};

export const createListing = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const listing = new Listing({
      ...req.body,
      userId: req.user!.uid,
    });
    await listing.save();
    res.status(201).json(listing);
  } catch (error) {
    next(error);
  }
};

export const getListingById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const listing = await Listing.findById(req.params.id)
      .populate('userId', 'name picture rating');
    
    if (!listing) {
      throw new AppError('Listing not found', 404);
    }
    
    res.json(listing);
  } catch (error) {
    next(error);
  }
};

export const updateListing = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const listing = await Listing.findOne({
      _id: req.params.id,
      userId: req.user!.uid,
    });

    if (!listing) {
      throw new AppError('Listing not found or unauthorized', 404);
    }

    Object.assign(listing, req.body);
    await listing.save();
    
    res.json(listing);
  } catch (error) {
    next(error);
  }
};

export const deleteListing = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const listing = await Listing.findOneAndDelete({
      _id: req.params.id,
      userId: req.user!.uid,
    });

    if (!listing) {
      throw new AppError('Listing not found or unauthorized', 404);
    }

    // Delete associated images
    for (const imageUrl of listing.images) {
      await deleteImage(imageUrl);
    }

    res.status(204).send();
  } catch (error) {
    next(error);
  }
};
