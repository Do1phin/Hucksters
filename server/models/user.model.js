import mongoose from 'mongoose';

const schema = new mongoose.Schema({
    email: {
        type: String,
        trim: true,
        unique: 'Email already exists',
        match: [/.+\@.+\..+/, 'Please fill a valid email address'],
        required: 'Email is required',
        lowercase: true
    },
    password: {
        type: String,
        required: 'Password is required',
        minlength: 8
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
