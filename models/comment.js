const mongoose = require("mongoose");
const { Schema } = mongoose;

const commentSchema = new Schema({
  text: String,
  author: {
    _id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },
    firstName: String,
    lastName: String,
    img: String
  },
  created: {
    type: Date,
    default: Date.now
  }
});

const Comment = mongoose.model("Comment", commentSchema);

module.exports = Comment;
