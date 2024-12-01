import { storage } from '../config/firebase';
import { AppError } from '../middleware/errorHandler';
import { v4 as uuidv4 } from 'uuid';

export const uploadImage = async (
  file: Express.Multer.File,
  folder: string = 'listings'
): Promise<string> => {
  try {
    const bucket = storage.bucket();
    const fileName = `${folder}/${uuidv4()}-${file.originalname}`;
    const fileUpload = bucket.file(fileName);

    const stream = fileUpload.createWriteStream({
      metadata: {
        contentType: file.mimetype,
      },
      resumable: false,
    });

    return new Promise((resolve, reject) => {
      stream.on('error', (error) => {
        reject(new AppError(`Failed to upload image: ${error.message}`, 500));
      });

      stream.on('finish', async () => {
        // Make the file public
        await fileUpload.makePublic();
        
        // Get the public URL
        const publicUrl = `https://storage.googleapis.com/${bucket.name}/${fileName}`;
        resolve(publicUrl);
      });

      stream.end(file.buffer);
    });
  } catch (error) {
    throw new AppError('Failed to upload image', 500);
  }
};

export const deleteImage = async (imageUrl: string): Promise<void> => {
  try {
    const bucket = storage.bucket();
    const fileName = imageUrl.split(`${bucket.name}/`)[1];
    
    if (!fileName) {
      throw new AppError('Invalid image URL', 400);
    }

    await bucket.file(fileName).delete();
  } catch (error) {
    throw new AppError('Failed to delete image', 500);
  }
};
