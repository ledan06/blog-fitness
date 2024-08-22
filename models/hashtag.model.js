const mongoose = require("mongoose");
const slug = require("mongoose-slug-updater");
mongoose.plugin(slug);
const hashtagSchema = new mongoose.Schema(
    {
        title: String,
        status: String,
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
        deletedBy: {
            account_id: String,
            deletedAt: Date
        },
        updatedBy: [
            {
                account_id: String,
                updatedAt: Date
            }
        ],
    }, {
    timestamps: true
});

const Hashtag = mongoose.model('Hashtag', hashtagSchema, "hashtags");

module.exports = Hashtag;