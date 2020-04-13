const {Schema, model} = require('mongoose');

const schema = new Schema({
    vkId: {type: Number, required: false, default: null},
    albumId: {type: Number, required: false, default: null},
    photoId: {type: Number, required: false, default: null, unique: true},
    photoText: {type: String, default: null},
    photoSrc: {type: String, default: null},
    photoDate: {type: Number, default: null},
});

module.exports = model('Photo', schema);
