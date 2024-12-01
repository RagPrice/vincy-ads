import mongoose, { Document, Schema } from 'mongoose';

export interface ICategory extends Document {
  name: string;
  slug: string;
  description?: string;
  parent?: mongoose.Types.ObjectId;
  level: number;
  order: number;
  icon?: string;
  image?: string;
  isActive: boolean;
  metadata?: {
    allowPriceRange?: boolean;
    allowCondition?: boolean;
    allowLocation?: boolean;
    customFields?: {
      name: string;
      type: 'text' | 'number' | 'select' | 'multiselect' | 'boolean';
      required: boolean;
      options?: string[];
    }[];
  };
  createdAt: Date;
  updatedAt: Date;
}

const categorySchema = new Schema<ICategory>(
  {
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    description: String,
    parent: { type: Schema.Types.ObjectId, ref: 'Category' },
    level: { type: Number, required: true, default: 0 },
    order: { type: Number, required: true, default: 0 },
    icon: String,
    image: String,
    isActive: { type: Boolean, default: true },
    metadata: {
      allowPriceRange: { type: Boolean, default: true },
      allowCondition: { type: Boolean, default: true },
      allowLocation: { type: Boolean, default: true },
      customFields: [{
        name: String,
        type: {
          type: String,
          enum: ['text', 'number', 'select', 'multiselect', 'boolean']
        },
        required: Boolean,
        options: [String]
      }]
    }
  },
  {
    timestamps: true
  }
);

// Indexes for faster queries
categorySchema.index({ slug: 1 });
categorySchema.index({ parent: 1 });
categorySchema.index({ level: 1, order: 1 });

export default mongoose.model<ICategory>('Category', categorySchema);
