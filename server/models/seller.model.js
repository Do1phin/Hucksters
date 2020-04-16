import mongoose from 'mongoose';

const schema = new mongoose.Schema({
    userId: {type: Number, required: true, unique: true},
    isSeller: {type: Boolean, default: null},
    isClosed: {type: Boolean, default: null},
    isDeactivated: {type: String, default: null},
    firstName: {type: String, default: null},
    lastName: {type: String, default: null},
    nickName: {type: String, default: null},
    domain: {type: String, default: null},
    sex: {type: Number, default: null},
    country: {type: String, default: null},
    photo: {type: String, default: null},
    albums: {type: Array, default: null},
    picturesInAlbums: {type: Number, default: null},
});

export default mongoose.model('Sellers', schema);

