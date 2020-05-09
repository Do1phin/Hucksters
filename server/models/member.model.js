import mongoose from 'mongoose';

const schema = new mongoose.Schema({
    // _id: {
    //     type: Number,
    //     unique: true,
    //     required: true
    // },
    owner_id: {
        type: Number,
        required: 'Owner id is required true',
        unique: true
    },
    seller: {
        type: Boolean,
        default: null
    },
    is_closed: {
        type: Boolean,
        default: null
    },
    deactivated: {
        type: String,
        default: null
    },
    first_name: {
        type: String,
        default: null
    },
    last_name: {
        type: String,
        default: null
    },
    nickname: {
        type: String,
        default: null
    },
    domain: {
        type: String,
        default: null
    },
    sex: {
        type: Number,
        default: null
    },
    country: {
        id: {
            type: Number,
            default: null
        },
        title: {
            type: String,
            default: null
        }
    },
    instagram: {
        type: String,
        default: null
    },
    photo: {
        type: String,
        default: null
    },
    albums: {
        type: Number,
        default: null
    },
    picturesInAlbums: {
        type: Number,
        default: null
    },
    _updated: {
        date: {
            type: Date,
            default: Date.now()
        },
        info: {
            type: String,
            default: null
        }
    },
    // _obj: {
    //     type: JSON,
    //     default: null
    // }
});

export default mongoose.model('Member', schema);

