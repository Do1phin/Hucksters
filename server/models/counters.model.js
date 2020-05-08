import mongoose from 'mongoose';

const schema = new mongoose.Schema({
    info: {
        type: String,
        default: 'counters',
        required: true,
        unique: true
    },
    all_members: {
        type: Number
    },
    banned: {
        type: Number
    },
    closed: {
        type: Number
    },
    deleted: {
        type: Number
    },
    seller: {
        type: Number
    },
    all_albums: {
        type: Number
    },
    all_photos: {
        type: Number
    },
    photo_with_text: {
        type: Number
    },
    photo_with_addit_photo: {
        type: Number
    }
});

export default mongoose.model('Counters', schema)
