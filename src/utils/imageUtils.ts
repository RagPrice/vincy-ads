// Function to import images dynamically
// export const getImageUrl = (imageName: string): string => {
//   try {
//     // For local images in assets folder
//     return new URL(`../assets/images/${imageName}`, import.meta.url).href;
//   } catch (error) {
//     console.error(`Error loading image: ${imageName}`, error);
//     return ''; // Return empty string or a default image URL
//   }
// };

type ImageSize = 'thumbnail' | 'medium' | 'large';

// Function to get the optimized image URL
export const getOptimizedImageUrl = (
  imageName: string,
  size: ImageSize = 'medium'
): string => {
  try {
    return new URL(`../assets/images/optimized/${size}/${imageName}.webp`, import.meta.url).href;
  } catch (error) {
    console.error(`Error loading optimized image: ${imageName}`, error);
    return getDefaultImage(size);
  }
};

// Function to get the default image for a specific size
export const getDefaultImage = (size: ImageSize = 'medium'): string => {
  try {
    return new URL(`../assets/images/optimized/${size}/default-placeholder.webp`, import.meta.url).href;
  } catch {
    return ''; // Fallback to empty string if default image doesn't exist
  }
};

// Function to handle external image URLs
export const isValidImageUrl = (url: string): boolean => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

// Function to get image URL (either optimized local or external)
export const resolveImageUrl = (
  image: string,
  size: ImageSize = 'medium'
): string => {
  if (isValidImageUrl(image)) {
    return image;
  }
  return getOptimizedImageUrl(image, size);
};

// Generate srcSet for responsive images
export const generateSrcSet = (imageName: string): string => {
  if (isValidImageUrl(imageName)) {
    return ''; // Don't generate srcSet for external URLs
  }

  const sizes: [ImageSize, number][] = [
    ['thumbnail', 300],
    ['medium', 800],
    ['large', 1200],
  ];

  return sizes
    .map(([size, width]) => `${getOptimizedImageUrl(imageName, size)} ${width}w`)
    .join(', ');
};

export const DEFAULT_IMAGE = getDefaultImage();
