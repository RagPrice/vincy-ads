import { Request, Response, NextFunction } from 'express';
import multer from 'multer';
import { AppError } from './errorHandler';

const ALLOWED_MIME_TYPES = ['image/jpeg', 'image/png', 'image/webp'];
const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB

// Configure multer for memory storage
const storage = multer.memoryStorage();

// Create multer instance with configuration
const upload = multer({
  storage,
  limits: {
    fileSize: MAX_FILE_SIZE
  },
  fileFilter: (req, file, cb) => {
    if (ALLOWED_MIME_TYPES.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new AppError('Invalid file type. Only JPEG, PNG and WebP are allowed', 400) as any);
    }
  }
});

// Middleware for single file upload
export const uploadSingle = (fieldName: string) => {
  return (req: Request, res: Response, next: NextFunction) => {
    upload.single(fieldName)(req, res, (err: any) => {
      if (err instanceof multer.MulterError) {
        if (err.code === 'LIMIT_FILE_SIZE') {
          next(new AppError('File size exceeds 10MB limit', 400));
        } else {
          next(new AppError(err.message, 400));
        }
      } else if (err) {
        next(err);
      } else {
        next();
      }
    });
  };
};

// Middleware for multiple file upload
export const uploadMultiple = (fieldName: string, maxCount: number = 10) => {
  return (req: Request, res: Response, next: NextFunction) => {
    upload.array(fieldName, maxCount)(req, res, (err: any) => {
      if (err instanceof multer.MulterError) {
        if (err.code === 'LIMIT_FILE_SIZE') {
          next(new AppError('File size exceeds 10MB limit', 400));
        } else if (err.code === 'LIMIT_FILE_COUNT') {
          next(new AppError(`Cannot upload more than ${maxCount} files`, 400));
        } else {
          next(new AppError(err.message, 400));
        }
      } else if (err) {
        next(err);
      } else {
        next();
      }
    });
  };
};
