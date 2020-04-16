import mongoose from 'mongoose';

const schema = new mongoose.Schema({
    userId: {type: Number, required: false, default: null},
    albumId: {type: Number, required: false, default: null},
    photoId: {type: Number, required: false, default: null, unique: true},
    text: {type: String, required: false, default: null},
    photo: {type: String, required: false, default: null},
    date: {type: Number, required: false, default: null},
});

export default mongoose.model('Photo', schema);
