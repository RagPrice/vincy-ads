import mongoose, { Document, Schema } from 'mongoose';

export interface IMessage {
  sender: Schema.Types.ObjectId;
  content: string;
  createdAt: Date;
  read: boolean;
}

export interface IChat extends Document {
  listingId: Schema.Types.ObjectId;
  participants: Schema.Types.ObjectId[];
  messages: IMessage[];
  lastMessage: IMessage;
  createdAt: Date;
  updatedAt: Date;
}

const messageSchema = new Schema<IMessage>({
  sender: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  content: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  read: { type: Boolean, default: false }
});

const chatSchema = new Schema<IChat>({
  listingId: { type: Schema.Types.ObjectId, ref: 'Listing', required: true },
  participants: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  messages: [messageSchema],
  lastMessage: messageSchema
}, {
  timestamps: true
});

// Index for faster queries
chatSchema.index({ participants: 1, listingId: 1 });
chatSchema.index({ updatedAt: -1 });

export default mongoose.model<IChat>('Chat', chatSchema);
