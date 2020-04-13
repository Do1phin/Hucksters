import mongoose from 'mongoose';

const schema = new mongoose.Schema({
    vkId: {type: Number, required: false, default: null},
    albumId: {type: Number, required: false, default: null, unique: true},
    albumTitle: {type: String, required: false, default: null},
    albumSize: {type: Number, default: null},
    albumCreated: {type: Number, default: null},
    albumUpdated: {type: Number, default: null},
});

export default mongoose.model('Album', schema);
