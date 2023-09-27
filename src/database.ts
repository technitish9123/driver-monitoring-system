import mongoose, { ConnectOptions } from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const { MONGODB_URI } = process.env;


// ? --------------------------------------------------------------------------------------------------------
// ? Mongo DB connection
// ? --------------------------------------------------------------------------------------------------------

if (!MONGODB_URI) {
    throw new Error("MONGODB_URI is not defined in the environment variables.");
}

mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
} as ConnectOptions);

const db = mongoose.connection;

//! DB connection Error
db.on('error', (error) => {
    console.error('MongoDB connection error:', error);
});

//! DB connected
db.once('open', () => {
    console.log('Connected to MongoDB');
});
