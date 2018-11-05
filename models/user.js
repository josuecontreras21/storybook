const mongoose = require('mongoose');
const {Schema} = mongoose;

userSchema = new Schema({
    googleID:{
        type: String,
        required: true,
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

const User = mongoose.model('User', userSchema);

module.exports = User;