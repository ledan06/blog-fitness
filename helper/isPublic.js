const Post = require("../models/post.model");

module.exports.publishPost = async (postId) => {
    await Post.updateOne({
        _id: postId
    }, {isPublished: true})
    // const post = await Post.findOne({
    //     _id: postId
    // })
    // if (post) {
    //     post.isPublished = true;
    //     await post.save();
    // }
};