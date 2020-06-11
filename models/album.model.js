import mongoose from 'mongoose';

const schema = new mongoose.Schema({
    owner_id: {
        type: Number,
        default: null
    },
    album_id: {
        type: Number,
        required: 'Album id is required true',
        default: null,
        unique: true
    },
    thumb_id: {
        type: Number,
        default: null
    },
    title: {
        type: String,
        default: null
    },
    size: {
        type: Number,
        default: null
    },
    photo: {
        type: String,
        default: null
    },
    created: {
        type: Number,
        default: null
    },
    updated: {
        type: Number,
        default: null
    },
    _updated: {
        date: {
            type: Date,
            default: Date.now()
        },
        info: {
            type: String,
            default: null
        }
    },
    owner: {type: mongoose.Schema.ObjectId, ref: 'Member'}
});

export default mongoose.model('Album', schema);
