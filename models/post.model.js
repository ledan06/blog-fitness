const mongoose = require("mongoose");
const slug = require("mongoose-slug-updater");
mongoose.plugin(slug);
const postSchema = new mongoose.Schema(
    {
        title: String,
        description: String,
        thumbnail: String,
        status: String,
        featured: String,
        position: Number,
        hashtag: Array,
        slug: {
            type: String,
            slug: "title",
            unique: true
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