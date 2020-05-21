import mongoose from 'mongoose';

const schema = new mongoose.Schema({
    owner_id: {
        type: Number,
        default: null
    },
    album_id: {
        type: Number,
        default: null
    },
    photo_id: {
        type: Number,
        required: 'Photo id required true',
        default: null,
        unique: true
    },
    text: {
        type: String,
        default: null
    },
    photo_sizes: {
        type: Array,
        default: null
    },
    additional_photos: {
        type: Number,
        default: 0
    },
    likes: {
        type: Number,
        default: 0
    },
    favorites: {
        type: Number,
        default: 0
    },
    comments: {
        type: Number,
        default: 0
    },
    date: {
        type: Number,
        default: null
    },
    thing_info: {
        brand: {
            type: String,
            default: null
        },
        gender: {
            type: String,
            default: null
        },
        type: {
            type: String,
            default: null
        },
        size: {
            type: String,
            default: null
        },
        cost: {
            type: Number,
            default: null
        },
        cost_currency: {
            type: String,
            default: null
        }
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
    album: {type: mongoose.Schema.ObjectId, ref: 'Album'}
});

export default mongoose.model('Photo', schema);
