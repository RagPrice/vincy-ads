import { Request, Response, NextFunction } from 'express';
import Category from '../models/Category';
import { AppError } from '../middleware/errorHandler';
import slugify from 'slugify';

export const getCategories = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { level, parent, active = true } = req.query;
    const query: any = {};

    if (level !== undefined) {
      query.level = Number(level);
    }
    if (parent) {
      query.parent = parent;
    }
    if (active === 'true') {
      query.isActive = true;
    }

    const categories = await Category.find(query)
      .sort('order')
      .populate('parent', 'name slug');

    res.json(categories);
  } catch (error) {
    next(error);
  }
};

export const getCategoryBySlug = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const category = await Category.findOne({ slug: req.params.slug })
      .populate('parent', 'name slug');

    if (!category) {
      throw new AppError('Category not found', 404);
    }

    // Get subcategories if any
    const subcategories = await Category.find({ 
      parent: category._id,
      isActive: true 
    }).sort('order');

    // Get sibling categories
    const siblings = category.parent ? 
      await Category.find({ 
        parent: category.parent,
        isActive: true 
      }).sort('order') : [];

    res.json({
      category,
      subcategories,
      siblings
    });
  } catch (error) {
    next(error);
  }
};

export const createCategory = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name, description, parentId, order, icon, image, metadata } = req.body;

    // Generate slug
    const slug = slugify(name, { lower: true });

    // Check if slug already exists
    const existingCategory = await Category.findOne({ slug });
    if (existingCategory) {
      throw new AppError('Category with this name already exists', 400);
    }

    // Determine level
    let level = 0;
    if (parentId) {
      const parent = await Category.findById(parentId);
      if (!parent) {
        throw new AppError('Parent category not found', 404);
      }
      level = parent.level + 1;
    }

    const category = new Category({
      name,
      slug,
      description,
      parent: parentId,
      level,
      order: order || 0,
      icon,
      image,
      metadata
    });

    await category.save();
    res.status(201).json(category);
  } catch (error) {
    next(error);
  }
};

export const updateCategory = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) {
      throw new AppError('Category not found', 404);
    }

    const { name, description, parentId, order, icon, image, isActive, metadata } = req.body;

    // Update slug if name changes
    if (name && name !== category.name) {
      const slug = slugify(name, { lower: true });
      const existingCategory = await Category.findOne({ 
        slug,
        _id: { $ne: category._id }
      });
      
      if (existingCategory) {
        throw new AppError('Category with this name already exists', 400);
      }
      category.slug = slug;
      category.name = name;
    }

    // Update parent and level if parent changes
    if (parentId !== undefined && parentId !== category.parent?.toString()) {
      if (parentId) {
        const parent = await Category.findById(parentId);
        if (!parent) {
          throw new AppError('Parent category not found', 404);
        }
        category.parent = parentId;
        category.level = parent.level + 1;
      } else {
        category.parent = undefined;
        category.level = 0;
      }
    }

    // Update other fields
    if (description !== undefined) category.description = description;
    if (order !== undefined) category.order = order;
    if (icon !== undefined) category.icon = icon;
    if (image !== undefined) category.image = image;
    if (isActive !== undefined) category.isActive = isActive;
    if (metadata !== undefined) category.metadata = metadata;

    await category.save();
    res.json(category);
  } catch (error) {
    next(error);
  }
};

export const deleteCategory = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) {
      throw new AppError('Category not found', 404);
    }

    // Check if category has subcategories
    const hasSubcategories = await Category.exists({ parent: category._id });
    if (hasSubcategories) {
      throw new AppError('Cannot delete category with subcategories', 400);
    }

    await category.deleteOne();
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};

export const reorderCategories = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { orders } = req.body;
    if (!Array.isArray(orders)) {
      throw new AppError('orders must be an array', 400);
    }

    // Update orders in bulk
    await Promise.all(
      orders.map(({ id, order }) => 
        Category.findByIdAndUpdate(id, { order })
      )
    );

    res.json({ message: 'Categories reordered successfully' });
  } catch (error) {
    next(error);
  }
};
