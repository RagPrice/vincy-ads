import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useAuth } from '../contexts/AuthContext';
import toast from 'react-hot-toast';

const createListingSchema = z.object({
  title: z.string().min(5, 'Title must be at least 5 characters'),
  description: z.string().min(20, 'Description must be at least 20 characters'),
  price: z.number().min(0, 'Price must be positive'),
  category: z.string().min(1, 'Please select a category'),
  subcategory: z.string().min(1, 'Please select a subcategory'),
  condition: z.enum(['new', 'like-new', 'good', 'fair', 'poor']),
  location: z.string().min(1, 'Location is required'),
  contactInfo: z.string(),
  isFeatured: z.boolean(),
  isOnSale: z.boolean(),
});

type CreateListingForm = z.infer<typeof createListingSchema>;

interface ValidationErrors {
  images?: string;
}

export default function CreateListing() {
  const { isAuthenticated, login } = useAuth();
  const navigate = useNavigate();
  const [images, setImages] = useState<File[]>([]);
  const [uploading, setUploading] = useState(false);
  const [validation, setValidation] = useState<ValidationErrors>({});

  const {
    register,
    formState: { errors },
    watch,
  } = useForm<CreateListingForm>({
    resolver: zodResolver(createListingSchema),
    defaultValues: {
      title: '',
      description: '',
      price: 0,
      category: '',
      subcategory: '',
      condition: 'new',
      location: '',
      contactInfo: '',
      isFeatured: false,
      isOnSale: false,
    },
  });

  const selectedCategory = watch('category');

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setImages((prev) => [...prev, ...files].slice(0, 10)); // Max 10 images
  };

  const handleImageDelete = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const validateForm = (formData: CreateListingForm): ValidationErrors => {
    const errors: ValidationErrors = {};

    if (images.length === 0) {
      errors.images = 'Please add at least one image';
    }
    return errors;
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setUploading(true);
    setValidation({});

    try {
      // Validate form data
      const currentFormData = watch();
      const errors = validateForm(currentFormData);
      if (Object.keys(errors).length > 0) {
        setValidation(errors);
        return;
      }

      // TODO: Submit form data to backend
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Show success message
      toast.success('Listing created successfully!');
      navigate('/profile');
    } catch (error) {
      console.error('Error creating listing:', error);
      toast.error('Failed to create listing. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-[400px] flex flex-col items-center justify-center">
        <h1 className="text-2xl font-bold mb-4">Sign in to create a listing</h1>
        <button
          onClick={() => login()}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
        >
          Sign In
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Create a New Listing</h1>

      <form onSubmit={onSubmit} className="space-y-6">
        {/* Title */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Title
          </label>
          <input
            type="text"
            {...register('title')}
            className="w-full px-4 py-2 border rounded-lg"
            placeholder="Enter a descriptive title"
          />
          {errors.title && (
            <p className="mt-1 text-sm text-red-600">{errors.title.message}</p>
          )}
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Description
          </label>
          <textarea
            {...register('description')}
            rows={4}
            className="w-full px-4 py-2 border rounded-lg"
            placeholder="Describe your item in detail"
          />
          {errors.description && (
            <p className="mt-1 text-sm text-red-600">
              {errors.description.message}
            </p>
          )}
        </div>

        {/* Price */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Price
          </label>
          <input
            type="number"
            {...register('price', { valueAsNumber: true })}
            className="w-full px-4 py-2 border rounded-lg"
            placeholder="Enter price"
            min="0"
            step="0.01"
          />
          {errors.price && (
            <p className="mt-1 text-sm text-red-600">{errors.price.message}</p>
          )}
        </div>

        {/* Category */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Category
          </label>
          <select
            {...register('category')}
            className="w-full px-4 py-2 border rounded-lg"
          >
            <option value="">Select a category</option>
            <option value="vehicles">Vehicles</option>
            <option value="property">Property</option>
            <option value="electronics">Electronics</option>
            <option value="furniture">Furniture</option>
            {/* Add more categories */}
          </select>
          {errors.category && (
            <p className="mt-1 text-sm text-red-600">{errors.category.message}</p>
          )}
        </div>

        {/* Subcategory */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Subcategory
          </label>
          <select
            {...register('subcategory')}
            className="w-full px-4 py-2 border rounded-lg"
            disabled={!selectedCategory}
          >
            <option value="">Select a subcategory</option>
            {selectedCategory === 'vehicles' && (
              <>
                <option value="cars">Cars</option>
                <option value="motorcycles">Motorcycles</option>
                <option value="trucks">Trucks</option>
              </>
            )}
            {selectedCategory === 'property' && (
              <>
                <option value="houses">Houses</option>
                <option value="apartments">Apartments</option>
                <option value="land">Land</option>
              </>
            )}
            {/* Add more subcategories */}
          </select>
          {errors.subcategory && (
            <p className="mt-1 text-sm text-red-600">
              {errors.subcategory.message}
            </p>
          )}
        </div>

        {/* Condition */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Condition
          </label>
          <select
            {...register('condition')}
            className="w-full px-4 py-2 border rounded-lg"
          >
            <option value="">Select condition</option>
            <option value="new">New</option>
            <option value="like-new">Like New</option>
            <option value="good">Good</option>
            <option value="fair">Fair</option>
            <option value="poor">Poor</option>
          </select>
          {errors.condition && (
            <p className="mt-1 text-sm text-red-600">
              {errors.condition.message}
            </p>
          )}
        </div>

        {/* Location */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Location
          </label>
          <input
            type="text"
            {...register('location')}
            className="w-full px-4 py-2 border rounded-lg"
            placeholder="Enter location"
          />
          {errors.location && (
            <p className="mt-1 text-sm text-red-600">{errors.location.message}</p>
          )}
        </div>

        {/* Images */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Images (Max 10)
          </label>
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handleImageChange}
            className="w-full px-4 py-2 border rounded-lg"
          />
          {validation.images && (
            <p className="mt-1 text-sm text-red-600">{validation.images}</p>
          )}
          <div className="mt-2 grid grid-cols-5 gap-2">
            {images.map((image, index) => (
              <div key={index} className="relative">
                <img
                  src={URL.createObjectURL(image)}
                  alt={`Preview ${index + 1}`}
                  className="w-full h-24 object-cover rounded-lg"
                />
                <button
                  type="button"
                  onClick={() => handleImageDelete(index)}
                  className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-red-600"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        </div>

        <button
          type="submit"
          disabled={uploading}
          className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50"
        >
          {uploading ? 'Creating...' : 'Create Listing'}
        </button>
      </form>
    </div>
  );
}
