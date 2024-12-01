import { Request, Response, NextFunction } from 'express';
import Listing from '../models/Listing';
import { AppError } from '../middleware/errorHandler';

interface SearchFilters {
  query?: string;
  category?: string;
  subcategory?: string;
  condition?: string;
  minPrice?: number;
  maxPrice?: number;
  location?: {
    lat: number;
    lng: number;
    radius: number; // in kilometers
  };
}

export const search = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const {
      q: searchQuery,
      category,
      subcategory,
      condition,
      minPrice,
      maxPrice,
      lat,
      lng,
      radius = 50, // Default radius of 50km
      sort = '-createdAt',
      page = 1,
      limit = 20
    } = req.query;

    const filters: SearchFilters = {};
    const query: any = {};

    // Text search
    if (searchQuery) {
      query.$text = { $search: searchQuery as string };
    }

    // Category filters
    if (category) {
      query.category = category;
    }
    if (subcategory) {
      query.subcategory = subcategory;
    }

    // Condition filter
    if (condition) {
      query.condition = condition;
    }

    // Price range filter
    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = Number(minPrice);
      if (maxPrice) query.price.$lte = Number(maxPrice);
    }

    // Location-based search
    if (lat && lng) {
      query['location.coordinates'] = {
        $near: {
          $geometry: {
            type: 'Point',
            coordinates: [Number(lng), Number(lat)]
          },
          $maxDistance: Number(radius) * 1000 // Convert km to meters
        }
      };
    }

    // Execute search query
    const listings = await Listing.find(query)
      .sort(sort)
      .skip((Number(page) - 1) * Number(limit))
      .limit(Number(limit))
      .populate('userId', 'name picture rating');

    // Get total count for pagination
    const total = await Listing.countDocuments(query);

    // Get category aggregations
    const categoryAggs = await Listing.aggregate([
      { $match: query },
      { $group: { _id: '$category', count: { $sum: 1 } } },
      { $sort: { count: -1 } }
    ]);

    // Get price range
    const priceStats = await Listing.aggregate([
      { $match: query },
      {
        $group: {
          _id: null,
          minPrice: { $min: '$price' },
          maxPrice: { $max: '$price' },
          avgPrice: { $avg: '$price' }
        }
      }
    ]);

    res.json({
      listings,
      total,
      pages: Math.ceil(total / Number(limit)),
      currentPage: Number(page),
      filters: {
        categories: categoryAggs,
        priceRange: priceStats[0] || { minPrice: 0, maxPrice: 0, avgPrice: 0 }
      }
    });
  } catch (error) {
    next(error);
  }
};

export const autoComplete = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { q: query } = req.query;
    if (!query) {
      throw new AppError('Search query is required', 400);
    }

    // Search in titles and categories
    const suggestions = await Listing.aggregate([
      {
        $search: {
          autocomplete: {
            query: query as string,
            path: 'title',
            fuzzy: {
              maxEdits: 1
            }
          }
        }
      },
      {
        $project: {
          _id: 1,
          title: 1,
          category: 1,
          price: 1,
          score: { $meta: 'searchScore' }
        }
      },
      { $limit: 10 }
    ]);

    // Get category suggestions
    const categories = await Listing.aggregate([
      {
        $match: {
          category: { $regex: query as string, $options: 'i' }
        }
      },
      {
        $group: {
          _id: '$category',
          count: { $sum: 1 }
        }
      },
      { $sort: { count: -1 } },
      { $limit: 5 }
    ]);

    res.json({
      suggestions,
      categories: categories.map(c => ({
        category: c._id,
        count: c.count
      }))
    });
  } catch (error) {
    next(error);
  }
};
