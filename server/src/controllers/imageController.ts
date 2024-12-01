import { Request, Response, NextFunction } from 'express';
import { ImageProcessor } from '../utils/imageProcessor';
import { storage } from '../config/firebase';
import { AppError } from '../middleware/errorHandler';
import { v4 as uuidv4 } from 'uuid';

interface UploadResult {
  original: string;
  thumbnail: string;
  medium: string;
  large: string;
  placeholder: string;
  dominantColors: string[];
  metadata: {
    width: number;
    height: number;
    format: string;
    size: number;
  };
}

export const uploadImage = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.file) {
      throw new AppError('No image file provided', 400);
    }

    // Process image in different sizes
    const processed = await ImageProcessor.processImage(req.file.buffer, {
      format: 'webp',
      quality: 80
    });

    // Generate placeholder
    const placeholder = await ImageProcessor.generatePlaceholder(req.file.buffer);

    // Extract dominant colors
    const dominantColors = await ImageProcessor.extractColors(req.file.buffer);

    // Upload to Firebase Storage
    const bucket = storage.bucket();
    const fileId = uuidv4();
    const uploadPromises = Object.entries(processed).map(async ([size, image]) => {
      const fileName = `listings/${fileId}-${size}.${image.format}`;
      const file = bucket.file(fileName);

      await file.save(image.buffer, {
        metadata: {
          contentType: `image/${image.format}`,
          metadata: {
            width: image.width,
            height: image.height,
            size: image.size
          }
        }
      });

      await file.makePublic();
      return [size, `https://storage.googleapis.com/${bucket.name}/${fileName}`];
    });

    const uploadedUrls = Object.fromEntries(await Promise.all(uploadPromises));

    const result: UploadResult = {
      original: uploadedUrls.large,
      thumbnail: uploadedUrls.thumbnail,
      medium: uploadedUrls.medium,
      large: uploadedUrls.large,
      placeholder,
      dominantColors,
      metadata: {
        width: processed.large.width,
        height: processed.large.height,
        format: processed.large.format,
        size: processed.large.size
      }
    };

    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

export const deleteImage = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { imageUrl } = req.body;
    if (!imageUrl) {
      throw new AppError('Image URL is required', 400);
    }

    const bucket = storage.bucket();
    const fileName = imageUrl.split(`${bucket.name}/`)[1];

    if (!fileName) {
      throw new AppError('Invalid image URL', 400);
    }

    // Delete all sizes of the image
    const fileId = fileName.split('-')[0];
    const files = await bucket.getFiles({
      prefix: `listings/${fileId}`
    });

    await Promise.all(
      files[0].map(file => file.delete())
    );

    res.status(204).send();
  } catch (error) {
    next(error);
  }
};

export const optimizeImage = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.file) {
      throw new AppError('No image file provided', 400);
    }

    const { maxWidth, maxHeight, quality } = req.query;

    const optimized = await ImageProcessor.optimizeImage(req.file.buffer, {
      maxWidth: maxWidth ? parseInt(maxWidth as string) : undefined,
      maxHeight: maxHeight ? parseInt(maxHeight as string) : undefined,
      quality: quality ? parseInt(quality as string) : undefined,
      format: 'webp'
    });

    res.set('Content-Type', `image/${optimized.format}`);
    res.send(optimized.buffer);
  } catch (error) {
    next(error);
  }
};
