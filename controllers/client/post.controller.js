const Post = require("../../models/post.model")
const Category = require("../../models/category.model")
const Hastag = require("../../models/hashtag.model")

//[GET]/post/detail/:slug
module.exports.index = async(req, res) => {
    const slug = req.params.slug

    const post = await Post.findOne({
        deleted: false,
        status: "posted",
        slug: slug
    })
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

//[GET]/post/:slugCategory
module.exports.category = async(req, res) => {
    const slug = req.params.slugCategory
    const category = await Category.findOne({
        deleted: false,
        slug: slug
    })
    const posts = await Post.find({
        deleted: false,
        status: "posted",
        post_category_id: category.id
    }).sort({ position: "desc"})
    res.render("client/pages/post/category",{
        pageTitle: `${category.title}`,
        posts: posts
    }
    )
}

//[Patch]/like/:typeLike/:idPost
module.exports.like = async(req, res) => {
    const typeLike = req.params.typeLike
    const idPost = req.params.idPost
    const post = await Post.findOne({
        _id: idPost,
        deleted: false,
        status: "posted"
    })

    let likeUpdate = typeLike == "like" ? post.like + 1 : post.like -1

    await Post.updateOne(
        { _id: idPost }, { like: likeUpdate }
    )

    res.json({
        code: 200,
        message: "Thành công!",
        like: likeUpdate
    })
}