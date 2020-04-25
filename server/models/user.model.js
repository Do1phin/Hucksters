import mongoose from 'mongoose';

const schema = new mongoose.Schema({
    email: {
        type: String,
        trim: true,
        unique: 'Email already exists',
        match: [/.+\@.+\..+/, 'Please fill a valid email address'],
        required: 'Email is required'
    },
    password: {
        type: String,
        required: 'Password is required'
    },
    _created: {
        type: Date,
        default: Date.now()
    },
    _updated: {
        type: Date,
        default: Date.now()
    }
});

export default mongoose.model('User', schema);
