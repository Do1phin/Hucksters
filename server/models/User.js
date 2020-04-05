const {Schema, model} = require('mongoose');

const schema = new Schema({
    email: {type: String, required: true, unique: true, trim: true},
    password: {type: String, required: true, trim: true}
});

module.exports = model('User', schema);
