const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://Sepa:123@cluster0.itthskd.mongodb.net/');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {type: String, required: true},
    phone_number: {type: String, unique: true},
    admin: {type: Boolean, default: false}
});

const User = mongoose.Model('User', userSchema);

module.exports = User;