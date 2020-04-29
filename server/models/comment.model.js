import mongoose from 'mongoose';

const schema = new mongoose.Schema({
    user_id: {
        type: Number,
        default: null,
    },
    album_id: {
        type: Number,
        default: null,
    },
    photo_id: {
        type: Number,
        default: null,
    },
    comment_id: {
        type: Number,
        required: true,
        unique: true,
        default: null,
    },
    text: {
        type: String,
        default: null,
    },
    date: {
        type: Number,
        default: null,
    },
    attach: {
        type: Array,
        default: null,
    },
    _updated: {type: Date, default: Date.now()}
});

export default mongoose.model('Comment', schema);
