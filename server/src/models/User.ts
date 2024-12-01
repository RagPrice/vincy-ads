import mongoose, { Document, Schema } from 'mongoose';

export interface IUser extends Document {
  uid: string;
  email: string;
  name?: string;
  picture?: string;
  phone?: string;
  location?: string;
  createdAt: Date;
  updatedAt: Date;
  listings: mongoose.Types.ObjectId[];
  favorites: mongoose.Types.ObjectId[];
  rating: number;
  reviewCount: number;
}

const userSchema = new Schema<IUser>(
  {
    uid: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    name: String,
    picture: String,
    phone: String,
    location: String,
    listings: [{ type: Schema.Types.ObjectId, ref: 'Listing' }],
    favorites: [{ type: Schema.Types.ObjectId, ref: 'Listing' }],
    rating: { type: Number, default: 0 },
    reviewCount: { type: Number, default: 0 },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<IUser>('User', userSchema);
