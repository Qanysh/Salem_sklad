const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://Sepa:123@cluster0.itthskd.mongodb.net/');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {type: String, required: true},
    hashed_password: { type: String, required: true},
    admin: {type: Boolean, default: false}
});

const clientSchema = new Schema({
    clientname: {type: String, required:true},
    phone_number: {type: String, unique:true},
    box_size: {type: String},
    created_at: { type: Date, default: Date.now }
});

const User = mongoose.model('User', userSchema);
const Client = mongoose.model('Client', clientSchema);

module.exports = {User, Client};