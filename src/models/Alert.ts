// Alert.ts
import mongoose, { Document, Schema } from 'mongoose';

export interface AlertModel extends Document {
    eventId: string;
    createdAt: Date;
}

const AlertSchema = new Schema<AlertModel>({
    eventId: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
});

export default mongoose.model<AlertModel>('Alert', AlertSchema);
