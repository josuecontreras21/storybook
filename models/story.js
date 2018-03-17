const mongoose = require('mongoose');
const Schema = mongoose.Schema;

storySchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    body: {
        type: String,
    },
    author: {
        _id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
        firstName: String,
        lastName: String,
        img: String,
    },
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref	: "Comment",
        },
    ],
    allowComments: {
        type: Boolean,
        default: true,
    },
    status: {
        type: String,
        default: "private"
    },
    created: {
        type: Date,
        default: Date.now
    },
    img:{
        type: String,
        default: "/static/img/dummy-placeholder-image-400x400.jpg"
    }
});

const Story = mongoose.model('Story', storySchema);

module.exports = Story;