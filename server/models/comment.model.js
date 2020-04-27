import mongoose from 'mongoose';

const schema = new mongoose.Schema({
    userId: {
        type: Number,
    },
    albumId: {
        type: Number,
    },
    photoId: {
        type: Number,
        required: true,
    },
    commentId: {
        type: Number,
        required: true,
        unique: true,
    },
    text: {
        type: String,
    },
    date: {
        type: String,
    },
    attachment: {
        type: Array,
    },
    _updated: {type: Date, default: Date.now()}
});

export default mongoose.model('Comment', schema);
