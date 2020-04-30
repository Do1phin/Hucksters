import mongoose from 'mongoose';

const schema = new mongoose.Schema({
    info: {
        type: String,
        default: 'counters',
        required: true,
        unique: true
    },
    all_users: {
        type: Number
    },
    banned: {
        type: Number
    },
    closed: {
        type: Number
    },
    deleted: {
        type: Number
    },
    sellers: {
        type: Number
    }
});

export default mongoose.model('InfoCounters', schema)
