const mongoose = require("mongoose");
const commentSchema = new mongoose.Schema(
    {
        userId: String,
        postId: String,
        content: String,
        likeBy: Array,
        like: {
            type: Number,
            default: 0
        },
        createAt: {
            type: Date,
            default: Date.now
        },
        deleted: {
            type: Boolean,
            default: false
        },
        // deletedAt: Date
        deletedBy: {
            account_id: String,
            deletedAt: Date
        },
    }, {
    timestamps: true
});

const Comment = mongoose.model('Comment', commentSchema, "comments");

module.exports = Comment;