const mongoose = require("mongoose");
const slug = require("mongoose-slug-updater");
mongoose.plugin(slug);
const postSchema = new mongoose.Schema(
    {
        title: String,
        post_category_id: {
            type: String,
            default: ""
        },
        description: String,
        thumbnail: String,
        status: String,
        featured: String,
        position: Number,
        hashtag: Array,
        likeBy: Array,
        like: {
            type: Number,
            default: 0
        },
        slug: {
            type: String,
            slug: "title",
            unique: true
        },
        //Hẹn giờ bài đăng
        scheduledDate: {
            type: Date,
            required: false,
        },
        createdBy: {
            account_id: String,
            createAt: {
                type: Date,
                default: Date.now
            }
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
        //update
        updatedBy: [
            {
                account_id: String,
                updatedAt: Date
            }
        ],
    }, {
    timestamps: true
});

const Post = mongoose.model('Post', postSchema, "posts");

module.exports = Post;