const mongoose = require("mongoose");
const slug = require('mongoose-slug-updater');

mongoose.plugin(slug);

const postCategorySchema = new mongoose.Schema(
    {
            title: String,
            parent_id: {
                type: String,
                default: ""
            },
            description: String,
            thumbnail: String,
            status: String,
            position: Number,
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
            deletedAt: Date
    },{
        timestamps: true
    });

const PostCategory = mongoose.model('PostCategory', postCategorySchema, "posts-category");

module.exports = PostCategory;