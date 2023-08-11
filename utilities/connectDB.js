import mongoose from 'mongoose';

let reconnectTries = 3;
let reconnectInterval = 3000;
export const connectDB = async (mongoURI) => {
    try {
        await mongoose.connect(mongoURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        console.log('Connected to MongoDB database');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error.message);
        if (reconnectTries > 0) {
            setTimeout(() => {
                console.log('Retrying MongoDB connection...');
                reconnectTries--;
                connectDB(mongoURI);
            }, reconnectInterval);
        } else {
            console.error('Maximum reconnection attempts reached.');
        }
    }
};
