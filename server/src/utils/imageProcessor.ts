import sharp from 'sharp';
import { AppError } from '../middleware/errorHandler';
import sizeOf from 'image-size';

interface ImageDimensions {
  width: number;
  height: number;
}

interface ProcessedImage {
  buffer: Buffer;
  format: string;
  width: number;
  height: number;
  size: number;
}

interface ImageSizes {
  thumbnail: ImageDimensions;
  medium: ImageDimensions;
  large: ImageDimensions;
}

const IMAGE_SIZES: ImageSizes = {
  thumbnail: { width: 150, height: 150 },
  medium: { width: 800, height: 600 },
  large: { width: 1920, height: 1080 }
};

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
const ALLOWED_FORMATS = ['jpeg', 'jpg', 'png', 'webp'];

export class ImageProcessor {
  /**
   * Validates image file before processing
   */
  static validateImage(buffer: Buffer): void {
    if (buffer.length > MAX_FILE_SIZE) {
      throw new AppError('Image file size exceeds 10MB limit', 400);
    }

    const dimensions = sizeOf(buffer);
    if (!dimensions || !dimensions.type || !ALLOWED_FORMATS.includes(dimensions.type)) {
      throw new AppError('Invalid image format. Allowed formats: JPEG, PNG, WebP', 400);
    }
  }

  /**
   * Processes image and returns multiple sizes
   */
  static async processImage(
    buffer: Buffer,
    options: {
      quality?: number;
      format?: 'jpeg' | 'webp';
    } = {}
  ): Promise<Record<string, ProcessedImage>> {
    try {
      this.validateImage(buffer);

      const format = options.format || 'webp';
      const quality = options.quality || 80;

      const processed: Record<string, ProcessedImage> = {};

      // Process each size in parallel
      await Promise.all(
        Object.entries(IMAGE_SIZES).map(async ([size, dimensions]) => {
          const image = await sharp(buffer)
            .resize(dimensions.width, dimensions.height, {
              fit: 'inside',
              withoutEnlargement: true
            })
            [format]({ quality })
            .toBuffer();

          const metadata = await sharp(image).metadata();

          processed[size] = {
            buffer: image,
            format,
            width: metadata.width || 0,
            height: metadata.height || 0,
            size: image.length
          };
        })
      );

      return processed;
    } catch (error) {
      if (error instanceof AppError) {
        throw error;
      }
      throw new AppError('Error processing image', 500);
    }
  }

  /**
   * Optimizes a single image for web
   */
  static async optimizeImage(
    buffer: Buffer,
    options: {
      maxWidth?: number;
      maxHeight?: number;
      quality?: number;
      format?: 'jpeg' | 'webp';
    } = {}
  ): Promise<ProcessedImage> {
    try {
      this.validateImage(buffer);

      const {
        maxWidth = 1920,
        maxHeight = 1080,
        quality = 80,
        format = 'webp'
      } = options;

      const image = await sharp(buffer)
        .resize(maxWidth, maxHeight, {
          fit: 'inside',
          withoutEnlargement: true
        })
        [format]({ quality })
        .toBuffer();

      const metadata = await sharp(image).metadata();

      return {
        buffer: image,
        format,
        width: metadata.width || 0,
        height: metadata.height || 0,
        size: image.length
      };
    } catch (error) {
      if (error instanceof AppError) {
        throw error;
      }
      throw new AppError('Error optimizing image', 500);
    }
  }

  /**
   * Generates a blurred placeholder image
   */
  static async generatePlaceholder(buffer: Buffer): Promise<string> {
    try {
      const placeholder = await sharp(buffer)
        .resize(20, 20, { fit: 'inside' })
        .blur(10)
        .webp({ quality: 20 })
        .toBuffer();

      return `data:image/webp;base64,${placeholder.toString('base64')}`;
    } catch (error) {
      throw new AppError('Error generating image placeholder', 500);
    }
  }

  /**
   * Extracts dominant colors from image
   */
  static async extractColors(buffer: Buffer, colorCount: number = 5): Promise<string[]> {
    try {
      const { dominant } = await sharp(buffer)
        .resize(100, 100, { fit: 'inside' })
        .raw()
        .toBuffer({ resolveWithObject: true });

      // Simple algorithm to extract dominant colors
      const colors = new Map<string, number>();
      
      for (let i = 0; i < dominant.length; i += 3) {
        const r = dominant[i];
        const g = dominant[i + 1];
        const b = dominant[i + 2];
        const color = `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
        colors.set(color, (colors.get(color) || 0) + 1);
      }

      return Array.from(colors.entries())
        .sort((a, b) => b[1] - a[1])
        .slice(0, colorCount)
        .map(([color]) => color);
    } catch (error) {
      throw new AppError('Error extracting image colors', 500);
    }
  }
}
