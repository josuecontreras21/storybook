const mongoose = require('mongoose');
const Schema = mongoose.Schema;

storySchema = new Schema({
    title:{
        type: String,
    },
    body: {
        type: String,
    },
    author: {
        _id:{
            type : mongoose.Schema.Types.ObjectId,
            ref  : "User",
        },
        username : String,
    },
    display: {
        type:String,
        default: "private"
    }
});

const Story = mongoose.model('story', storySchema);

module.exports = Story;