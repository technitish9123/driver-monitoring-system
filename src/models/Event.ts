// Event.ts
import mongoose, { Document, Schema } from 'mongoose';

export interface EventModel extends Document {
    timestamp: Date;
    isDrivingSafe: boolean;
    vehicleId: string;
    locationType: string;
}

const EventSchema = new Schema<EventModel>({
    timestamp: { type: Date, required: true },
    isDrivingSafe: { type: Boolean, required: true },
    vehicleId: { type: String, required: true },
    locationType: { type: String, required: true },
});

export default mongoose.model<EventModel>('Event', EventSchema);
