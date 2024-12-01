import mongoose, { Document, Schema } from 'mongoose';

export type NotificationType = 
  | 'new_message'
  | 'new_review'
  | 'listing_favorite'
  | 'price_update'
  | 'listing_sold'
  | 'listing_expired';

export interface INotification extends Document {
  userId: Schema.Types.ObjectId;
  type: NotificationType;
  title: string;
  message: string;
  read: boolean;
  data?: Record<string, any>;
  createdAt: Date;
  updatedAt: Date;
}

const notificationSchema = new Schema<INotification>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    type: {
      type: String,
      required: true,
      enum: [
        'new_message',
        'new_review',
        'listing_favorite',
        'price_update',
        'listing_sold',
        'listing_expired'
      ]
    },
    title: { type: String, required: true },
    message: { type: String, required: true },
    read: { type: Boolean, default: false },
    data: { type: Schema.Types.Mixed },
  },
  {
    timestamps: true
  }
);

// Index for faster queries
notificationSchema.index({ userId: 1, createdAt: -1 });
notificationSchema.index({ userId: 1, read: 1 });

export default mongoose.model<INotification>('Notification', notificationSchema);
