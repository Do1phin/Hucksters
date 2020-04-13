const {Schema, model} = require('mongoose');

const schema = new Schema({
    vkId: {type: Number, required: false, default: null},
    albumId: {type: Number, required: false, default: null, unique: true},
    albumTitle: {type: String, required: false, default: null},
    albumSize: {type: Number, default: null},
    albumCreated: {type: Number, default: null},
    albumUpdated: {type: Number, default: null},
});

module.exports = model('Album', schema);
