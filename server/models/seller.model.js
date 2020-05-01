import mongoose from 'mongoose';

const schema = new mongoose.Schema({
    _id: {
        type: Number,
        unique: true,
        required: true
    },
    user_id: {
        type: Number,
        required: 'User id is required true',
        unique: true
    },
    seller: {
        type: Boolean,
        default: null
    },
    is_closed: {
        type: Boolean,
        default: null
    },
    deactivated: {
        type: String,
        default: null
    },
    first_name: {
        type: String,
        default: null
    },
    last_name: {
        type: String,
        default: null},
    nickname: {
        type: String,
        default: null
    },
    domain: {
        type: String,
        default: null
    },
    sex: {
        type: Number,
        default: null
    },
    country: {
        type: String,
        default: null
    },
    photo: {
        type: String,
        default: null
    },
    albums: {
        type: Number,
        default: null
    },
    picturesInAlbums: {
        type: Number,
        default: null
    },
    _updated: {type: Date, default: Date.now()}
});

export default mongoose.model('Sellers', schema);

