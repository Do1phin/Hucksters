const {Schema, model} = require('mongoose');

const schema = new Schema({
    vkId: {
        type: Number,
        required: true,
        unique: true
    },
    firstName: {type: String, default: null},
    lastName: {type: String, default: null},
    seller: {type: Boolean, default: null},
    accountStatus: {type: String, default: null},
    avatar: {type: String, default: null},
    albums: {type: Array, default: null},
    picturesInAlbums: {type: Number, default: null},
});

module.exports = model('Seller', schema);
