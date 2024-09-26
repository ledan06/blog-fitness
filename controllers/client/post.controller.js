const Post = require("../../models/post.model")
const Category = require("../../models/category.model")
const Hastag = require("../../models/hashtag.model")
const User = require("../../models/user.model")
const Comment = require("../../models/comment.model")

//[GET]/post/detail/:slug
module.exports.index = async(req, res) => {
    const slug = req.params.slug
    let isActive = false
    const post = await Post.findOne({
        deleted: false,
        status: "posted",
        slug: slug
    })
    if(res.locals.user){
        const user = await User.findOne({
            deleted: false,
            tokenUser: res.locals.user.tokenUser
        })
        if(post.likeBy.includes(user.id)){
            isActive = true
        }
    }
    let comments = []
    if(post.commentBy){
        for (const item of post.commentBy) {
            const comment = await Comment.findOne({
                _id: item,
                deleted: false
            })
            if(comment){
                const user = await User.findOne({
                    _id: comment.userId,
                    deleted: false
                })
                const detailComment = {
                    comment: comment.content,
                    commentId: comment.id,
                    createdAt: comment.createdAt,
                    userName: user.fullName,
                    userId: comment.userId
                }
                comments.push(detailComment)
            }
            
        }
    }
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
        post: post,
        isLike: isActive,
        comments: comments.reverse()
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
    const user = await User.findOne({
        deleted: false,
        tokenUser: res.locals.user.tokenUser
    })

    if(typeLike == "like"){
        if(!post.likeBy.includes(user.id)){
            likeUpdate = post.like + 1;
            await Post.updateOne(
                { _id: idPost }, 
                { 
                    $inc: { like: 1 },
                    $addToSet: { likeBy: user.id }
                }
            )
        }
    }
    else {
        if(post.likeBy.includes(user.id)){
            likeUpdate = post.like - 1;
            await Post.updateOne(
                { _id: idPost }, 
                { 
                    $inc: { like: -1 },
                    $pull: { likeBy: user.id }
                }
            )
        }
    }

    res.json({
        code: 200,
        message: "Thành công!",
        like: likeUpdate || post.like
    })
}

//[POST] post/comment/:idPost
module.exports.comment = async(req, res)=> {
    const postId = req.params.idPost
    const userId = res.locals.user.id 
    const content = req.body.comment
    const comments = new Comment({
        userId: userId, postId: postId, content: content
    })
    await comments.save()

    await Post.updateOne(
        { _id: postId },
        {
            $push: { commentBy: comments.id }
        }
    )
    res.json({
        code: 200,
        message: "Thành công",
        content: content,
        user: res.locals.user,
        createdAt: new Date(),
        
    })
}

//[DELETE] post/delete/:idComment
module.exports.commentDelete = async (req, res)=> {
    const id = req.params.idComment
    await Comment.deleteOne({ _id: id})
    res.json({
        code: 200,
        message: "Thành công",
    })

}