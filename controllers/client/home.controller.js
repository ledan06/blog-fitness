const Post = require("../../models/post.model")
module.exports.index = async(req, res) => {
    const posts = await Post.find({
        deleted: false,
        status: "posted"
    }).select("title thumbnail createdAt post_category_id featured hashtag slug")
    res.render("client/pages/home/index", {
        pageTitle: "Trang chủ",
        posts: posts
    })
}