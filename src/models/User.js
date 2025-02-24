const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: { type: String, trim: true, required: true, index: true},
    email: {type: String, trim: true, required: true, unique: true},
    password: {type: String, required: true, trim: true},
    phone: { type: String, required: true, trim: true, minlength: 10, maxlength: 15}
},{timestamps: true, versionKey: false});

const User = mongoose.model('User', UserSchema);

module.exports = User;