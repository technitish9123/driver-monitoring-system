// Alert.ts
import mongoose, { Document, Schema } from 'mongoose';

export interface AlertModel extends Document {
    AlertId: String
    locationType: String
    createdAt: Date;
}

const AlertSchema = new Schema<AlertModel>({
    AlertId: { type: String, required: true },
    locationType: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
});

export default mongoose.model<AlertModel>('Alert', AlertSchema);
