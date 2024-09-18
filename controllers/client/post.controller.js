const Post = require("../../models/post.model")
const Category = require("../../models/category.model")
const Hastag = require("../../models/hashtag.model")
module.exports.index = async(req, res) => {
    const slug = req.params.slug

    const post = await Post.findOne({
        deleted: false,
        status: "posted",
        slug: slug
    }).select("title thumbnail description createdAt post_category_id featured hashtag slug")
    if(post.post_category_id){
        const id = post.post_category_id
        const category = await Category.findOne({
            _id: id,
            deleted: false,
            status: "active"
        })
        post.category = category
    }
    if(post.hashtag){
        let hastagTitle = []
        for (const item of post.hashtag) {
            const hashtagId = await Hastag.findOne({
                deleted: false,
                _id: item
            })
            hastagTitle.push(hashtagId.title)
        }
        post.hastagTitle = hastagTitle
    }
    
    res.render("client/pages/post/detail", {
        pageTitle: post.title,
        post: post
    })
    
}