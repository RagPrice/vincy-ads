import sharp from 'sharp';
import { glob } from 'glob';
import path from 'path';
import fs from 'fs';

interface ImageConfig {
  width: number;
  height: number;
  quality: number;
}

const CONFIGS: Record<string, ImageConfig> = {
  thumbnail: {
    width: 300,
    height: 200,
    quality: 80,
  },
  medium: {
    width: 800,
    height: 600,
    quality: 85,
  },
  large: {
    width: 1200,
    height: 900,
    quality: 90,
  },
};

const SOURCE_DIR = '../src/assets/images/originals';
const OUTPUT_DIR = '../src/assets/images/optimized';

async function optimizeImage(inputPath: string): Promise<void> {
  const filename = path.basename(inputPath, path.extname(inputPath));
  
  // Create output directories if they don't exist
  Object.keys(CONFIGS).forEach((size) => {
    const dir = path.join(__dirname, OUTPUT_DIR, size);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
  });

  // Process each size configuration
  for (const [size, config] of Object.entries(CONFIGS)) {
    const outputPath = path.join(
      __dirname,
      OUTPUT_DIR,
      size,
      `${filename}.webp`
    );

    try {
      await sharp(inputPath)
        .resize(config.width, config.height, {
          fit: 'cover',
          position: 'center',
        })
        .webp({ quality: config.quality })
        .toFile(outputPath);

      console.log(`✅ Generated ${size} image: ${outputPath}`);
    } catch (error) {
      console.error(`❌ Error processing ${inputPath}:`, error);
    }
  }
}

async function processImages(): Promise<void> {
  try {
    // Create source directory if it doesn't exist
    const sourceDir = path.join(__dirname, SOURCE_DIR);
    if (!fs.existsSync(sourceDir)) {
      fs.mkdirSync(sourceDir, { recursive: true });
    }

    // Find all images in the source directory
    const images = await glob('**/*.{jpg,jpeg,png,webp}', {
      cwd: sourceDir,
      absolute: true,
    });

    if (images.length === 0) {
      console.log('No images found in the source directory.');
      return;
    }

    console.log(`Found ${images.length} images to process...`);

    // Process all images
    await Promise.all(images.map(optimizeImage));

    console.log('✨ Image optimization complete!');
  } catch (error) {
    console.error('Error processing images:', error);
  }
}

// Run the optimization
processImages();
