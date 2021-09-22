const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const User = new Schema ({
    //uuid: { type: String, unique: true },
    email: { type: String, unique: true },
    password: { type: String },
});

module.exports = mongoose.model('User', User)