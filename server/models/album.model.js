import mongoose from 'mongoose';

const schema = new mongoose.Schema({
    userId: {type: Number, required: false, default: null},
    albumId: {type: Number, required: false, default: null, unique: true},
    thumbId: {type: Number, required: false, default: null},
    title: {type: String, required: false, default: null},
    size: {type: Number, required: false, default: null},
    photo: {type: String, required: false, default: null},
    created: {type: Number, required: false, default: null},
    updated: {type: Number, required: false, default: null}
});

export default mongoose.model('Album', schema);
