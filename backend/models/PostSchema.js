const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    author: {
        type: Schema.Types.ObjectId,
        ref:'Users',
        required: true
    },
    datetime: {
        type: String,
        required: true
    },
    description: {
      type: String,
      required: true,
    },
    image: {
        type: String,
    }
});

PostSchema.methods.createDate = function () {
    this.datetime = new Date();
};

const Posts = mongoose.model('Posts', PostSchema);
module.exports = Posts;