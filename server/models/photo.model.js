import mongoose from 'mongoose';

const schema = new mongoose.Schema({
    vkId: {type: Number, required: false, default: null},
    albumId: {type: Number, required: false, default: null},
    photoId: {type: Number, required: false, default: null, unique: true},
    photoText: {type: String, default: null},
    photoSrc: {type: String, default: null},
    photoDate: {type: Number, default: null},
});

export default mongoose.model('Photo', schema);
