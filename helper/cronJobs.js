const cron = require('node-cron');
const Post = require("../models/post.model")
const isPublicHelper = require("./isPublic")

module.exports = () => {
    cron.schedule('* * * * *', async () => {
        const now = new Date();
        now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
        const postsToPublish = await Post.find({
            isPublished: false,
            scheduledDate: { $lte: now },
        });

        postsToPublish.forEach(post => {
            isPublicHelper.publishPost(post._id);
        });
    });
};