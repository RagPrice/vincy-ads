import mongoose, { Document, Schema } from 'mongoose';

export interface IReview extends Document {
  reviewer: Schema.Types.ObjectId;
  reviewee: Schema.Types.ObjectId;
  listing: Schema.Types.ObjectId;
  rating: number;
  comment: string;
  createdAt: Date;
  updatedAt: Date;
}

const reviewSchema = new Schema<IReview>(
  {
    reviewer: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    reviewee: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    listing: { type: Schema.Types.ObjectId, ref: 'Listing', required: true },
    rating: { 
      type: Number, 
      required: true,
      min: 1,
      max: 5
    },
    comment: { 
      type: String, 
      required: true,
      maxlength: 500
    }
  },
  {
    timestamps: true
  }
);

// Prevent duplicate reviews
reviewSchema.index({ reviewer: 1, listing: 1 }, { unique: true });

export default mongoose.model<IReview>('Review', reviewSchema);
