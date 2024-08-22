const systemConfig = require("../../config/system")
const hashtagHelper = require("../../helper/hashtag.helper")
const Hashtag = require("../../models/hashtag.model")
const Post = require("../../models/post.model")
//[GET] admin/blogs
module.exports.index = async(req, res)=>{
    const posts = await Post.find({
        deleted: false
    })
    await hashtagHelper.hashtag(posts)
    res.render("admin/pages/post/index", {
        pageTitle: "Danh sách bài viết",
        posts: posts
    })
}

//[GET] admin/blogs/create
module.exports.create = (req, res)=>{
    res.render("admin/pages/post/create", {
        pageTitle: "Tạo bài viết"
    })
}

//[POST] admin/posts/createPost
module.exports.createPost = async (req, res)=>{
    const countPosition = await Post.countDocuments()
    req.body.position =countPosition + 1
    if(req.file){
        req.body.thumbnail = `/uploads/${req.file.filename}`
    }
    

    const hashtag = req.body.hashtag.split(/[,.]\s*/).map(tag => tag.trim()).filter(tag => tag.length > 0)
    let hashtagId =[]
    for (let i = 0; i < hashtag.length; i++) {
       
        const existhashtag = await Hashtag.findOne({
            title: hashtag[i]
        })
        if(!existhashtag){
            const hashtags = new Hashtag({
                title: hashtag[i]
            })
            await hashtags.save()
            hashtagId.push(hashtags.id)
        }
        else {
            hashtagId.push(existhashtag.id)
        }
    }
   
    req.body.hashtag = hashtagId
  
    const post = new Post(req.body)
    await post.save()
    req.flash("success", "Tạo bài viết thành công")

    res.redirect(`${systemConfig.prefixAdmin}/posts`)
    // res.send("OK")
}

//[GET] admin/posts/edit/:id
module.exports.edit = async (req, res)=>{
    const id = req.params.id
    const post = await Post.findOne({
        _id: id,
        deleted: false
    })
    const hashtagId = post.hashtag
        for (let i = 0; i < hashtagId.length; i++) {
       
            const infoHashtag = await Hashtag.findOne({
                _id: hashtagId[i]
            }).select("title")
            hashtagId.splice(i,1)
            hashtagId.unshift(infoHashtag.title)
        }
        post.infoHashtags = hashtagId.reverse().join(", ")
    res.render("admin/pages/post/edit", {
        pageTitle: "Chỉnh sửa bài viết",
        post: post,
    })
}

//[PATCH] admin/posts/edit/:id
module.exports.editPatch = async (req, res)=>{
    const id = req.params.id
    
    req.body.hashtag = req.body.hashtag.split(", ")

    if(req.file){
        req.body.thumbnail = `/uploads/${req.file.filename}`
    }
  
    const hashtag = req.body.hashtag
    console.log(hashtag)
    let hashtagId=[]
    for (let i = 0; i < hashtag.length; i++) {
       
        const existhashtag = await Hashtag.findOne({
            title: hashtag[i]
        })
        if(!existhashtag){
            const hashtags = new Hashtag({
                title: hashtag[i]
            })
            await hashtags.save()
            hashtagId.push(hashtags.id)
        }
        else {
            hashtagId.push(existhashtag.id)
        }
    }
   
    req.body.hashtag = hashtagId
    console.log(req.body.hashtag)

    await Post.updateOne({_id: id }, req.body)

    req.flash("success", "Sửa bài viết thành công")

    res.redirect("back")
}