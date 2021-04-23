const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
    post: {
        type: Schema.Types.ObjectId,
        ref: 'Posts',
        required: true
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'Users',
        required: true
    },
    text: {
        type: String,
        required: true
    } ,
    datetime: {
        type: String,
        required: true,
    }
});

CommentSchema.methods.createDate = function () {
    this.datetime = new Date();
};

const Comments = mongoose.model('Comments', CommentSchema);
module.exports = Comments;