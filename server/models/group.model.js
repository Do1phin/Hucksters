import mongoose from 'mongoose';

const schema = new mongoose.Schema({
    groupId: {type: Number, required:true, unique: true},
    name: {type: String, default: null},
    size: {type: Number, default: null},
    photo: {type: String, default: null},
    _updated: {type: Date, default: Date.now()}
});

export default mongoose.model('Group', schema);
