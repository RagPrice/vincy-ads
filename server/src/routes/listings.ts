import express from 'express';
import { authenticate } from '../middleware/auth';
import Listing from '../models/Listing';
import { AppError } from '../middleware/errorHandler';

const router = express.Router();

// Get all listings with filters
router.get('/', async (req, res, next) => {
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
});

// Create new listing
router.post('/', authenticate, async (req, res, next) => {
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
});

// Get listing by ID
router.get('/:id', async (req, res, next) => {
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
});

// Update listing
router.patch('/:id', authenticate, async (req, res, next) => {
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
});

// Delete listing
router.delete('/:id', authenticate, async (req, res, next) => {
  try {
    const listing = await Listing.findOneAndDelete({
      _id: req.params.id,
      userId: req.user!.uid,
    });

    if (!listing) {
      throw new AppError('Listing not found or unauthorized', 404);
    }

    res.status(204).send();
  } catch (error) {
    next(error);
  }
});

export default router;
