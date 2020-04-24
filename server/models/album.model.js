import mongoose from 'mongoose';

const schema = new mongoose.Schema({
    userId: {type: Number, default: null},
    albumId: {type: Number, default: null, unique: true},
    thumbId: {type: Number, default: null},
    title: {type: String, default: null},
    size: {type: Number, default: null},
    photo: {type: String, default: null},
    created: {type: Number, default: null},
    updated: {type: Number, default: null},
    _updated: {type: Date, default: Date.now()}
});

export default mongoose.model('Album', schema);
