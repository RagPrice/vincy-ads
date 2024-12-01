import mongoose, { Document, Schema } from 'mongoose';

export interface IListing extends Document {
  title: string;
  description: string;
  price: number;
  category: string;
  subcategory: string;
  condition: 'new' | 'like-new' | 'good' | 'fair' | 'poor';
  images: string[];
  location: {
    address: string;
    coordinates?: {
      lat: number;
      lng: number;
    };
  };
  userId: Schema.Types.ObjectId;
  status: 'active' | 'sold' | 'expired' | 'draft';
  featured: boolean;
  views: number;
  favorites: number;
  createdAt: Date;
  updatedAt: Date;
}

const listingSchema = new Schema<IListing>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: String, required: true },
    subcategory: { type: String, required: true },
    condition: {
      type: String,
      enum: ['new', 'like-new', 'good', 'fair', 'poor'],
      required: true,
    },
    images: [{ type: String }],
    location: {
      address: { type: String, required: true },
      coordinates: {
        lat: Number,
        lng: Number,
      },
    },
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    status: {
      type: String,
      enum: ['active', 'sold', 'expired', 'draft'],
      default: 'active',
    },
    featured: { type: Boolean, default: false },
    views: { type: Number, default: 0 },
    favorites: { type: Number, default: 0 },
  },
  {
    timestamps: true,
  }
);

// Add text index for search
listingSchema.index({ title: 'text', description: 'text' });

export default mongoose.model<IListing>('Listing', listingSchema);
