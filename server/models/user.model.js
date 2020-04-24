import mongoose from 'mongoose';

const schema = new mongoose.Schema({
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    _updated: {type: Date, default: Date.now()}
});

export default mongoose.model('User', schema);
