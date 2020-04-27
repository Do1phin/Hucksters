import mongoose from 'mongoose';

const schema = new mongoose.Schema({
    userId: {
        type: Number,
        default: null
    },
    albumId: {
        type: Number,
        default: null
    },
    photoId: {
        type: Number,
        required: 'Photo id required true',
        default: null,
        unique: true
    },
    text: {
        type: String,
        default: null
    },
    photoSizes: {
        type: Array,
        default: null
    },
    likes: {
        type: Number,
        default: null
    },
    comments: {
        type: Number,
        default: null
    },
    date: {
        type: String,
        default: null
    },
    _updated: {
        type: Date,
        default: Date.now()
    },
    album: {type: mongoose.Schema.ObjectId, ref: 'Album'}
});

export default mongoose.model('Photo', schema);
