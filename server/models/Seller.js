const { Schema, model } = require('mongoose');

const schema = new Schema({
    vkId: {
        type: Number,
        required: true,
        unique: true
    },
    firstName: {
        type: String,
    },
    lastName: {
        type: String,
    },
    seller: {
        type: Boolean,
    },
    avatar: {
        type: String,
    },
    albums: {
        type: Number,
    },
    picturesInAlbums: {
        type: Number
    }
});

module.exports = model('Seller', schema);
