import mongoose from 'mongoose';

const schema = mongoose.Schema;

const subscriberSchema = new schema({
    emails: [
        {
            type: String,
            required: true,
            unique: true,
        },
    ],
});

// Create a static method to add a subscriber email
subscriberSchema.statics.addSubscriber = async function (email) {
    try {
        const subscriber = await this.findOneAndUpdate(
            {},
            { $addToSet: { emails: email } },
            { upsert: true, new: true }
        );
        return subscriber;
    } catch (error) {
        throw error;
    }
};

// Create a static method to remove a subscriber email
subscriberSchema.statics.removeSubscriber = async function (email) {
    try {
        const subscriber = await this.findOneAndUpdate(
            {},
            { $pull: { emails: email } },
            { new: true }
        );
        return subscriber;
    } catch (error) {
        throw error;
    }
};

const Subscribers = mongoose.model('Subscribers', subscriberSchema);

export default Subscribers;
