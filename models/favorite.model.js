import mongoose from 'mongoose';

const schema = new mongoose.Schema({
    user_id: {
        type: String,
        required: true,
        unique: true
    },
    favorite_members: {
        type: Array,
        default: []
    },
    favorite_albums: {
        type: Array,
        default: []
    },
    favorite_photos: {
        type: Array,
        default: []
    }
});

export default mongoose.model('Favorite', schema);
