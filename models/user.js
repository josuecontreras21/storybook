const mongoose = require('mongoose');
const Schema = mongoose.Schema;

userSchema = new Schema({
    googleID:{
        type: String,
        required: true,
    },
    username: {
        type: String,
        unique: true,
    },
    email: {
        type: String,
        unique: true,
        required: true,
    }, 
    firstName: String,
    lastName: String,
    img: String,
});

const User = mongoose.model('user', userSchema);

module.exports = User;