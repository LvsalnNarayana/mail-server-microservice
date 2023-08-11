import mongoose from 'mongoose';

const verificationSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    code: {
        type: String,
        required: true,
    },
    expiresAt: {
        type: Date,
        required: true,
        index: { expires: '15m' }, // Create a TTL index to automatically delete after 15 minutes
    },
});

const Verification = mongoose.model('Verification', verificationSchema);

export default Verification;
