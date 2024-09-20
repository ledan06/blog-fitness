const Post = require("../../models/post.model")
module.exports.index = async(req, res) => {
    const posts = await Post.find({
        deleted: false,
        status: "posted"
    }).sort({ position: "desc"})
    res.render("client/pages/home/index", {
        pageTitle: "Trang chủ",
        posts: posts
    })
}