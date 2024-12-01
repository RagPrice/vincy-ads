import express from 'express';
import { authenticate } from '../middleware/auth';
import { uploadSingle, uploadMultiple } from '../middleware/upload';
import { uploadImage, deleteImage, optimizeImage } from '../controllers/imageController';

const router = express.Router();

// Upload single image with processing
router.post(
  '/upload',
  authenticate,
  uploadSingle('image'),
  uploadImage
);

// Upload multiple images
router.post(
  '/upload/multiple',
  authenticate,
  uploadMultiple('images', 10),
  async (req, res, next) => {
    try {
      const files = req.files as Express.Multer.File[];
      const results = await Promise.all(
        files.map(file => {
          const fakeReq = { file } as any;
          const fakeRes = {
            status: () => ({ json: (data: any) => data }),
          } as any;
          return uploadImage(fakeReq, fakeRes, next);
        })
      );
      res.status(201).json(results);
    } catch (error) {
      next(error);
    }
  }
);

// Delete image
router.delete(
  '/',
  authenticate,
  deleteImage
);

// Optimize image on-the-fly
router.post(
  '/optimize',
  authenticate,
  uploadSingle('image'),
  optimizeImage
);

export default router;
