const systemConfig = require("../../config/system")
const hashtagHelper = require("../../helper/hashtag.helper")
const convertToSlugHelper = require("../../helper/convertToSlug")
const isPublicHelper = require("../../helper/isPublic")
const filterStatusHelpers = require("../../helper/filterStatus")
const helperCreateTree = require("../../helper/createTree")
const Hashtag = require("../../models/hashtag.model")
const Post = require("../../models/post.model")
const Category = require("../../models/category.model")
//[GET] admin/posts
module.exports.index = async(req, res)=>{
    let find = {
        deleted: false
    }
    //status
    const filterStatus = filterStatusHelpers(req.query);
    if(req.query.status){
        find.status = req.query.status
    }
    
    const posts = await Post.find(find).sort({position: "desc"})
    

    await hashtagHelper.hashtag(posts)

    res.render("admin/pages/post/index", {
        pageTitle: "Danh sách bài viết",
        posts: posts,
        filterStatus: filterStatus
    })
}

//[GET] admin/posts/create
module.exports.create = async(req, res)=>{
    const records = await Category.find({
        deleted: false
    })
    const category = helperCreateTree.tree(records)

    res.render("admin/pages/post/create", {
        pageTitle: "Tạo bài viết",
        category: category
    })
}

//[POST] admin/posts/createPost
module.exports.createPost = async (req, res)=>{
    const countPosition = await Post.countDocuments()
    req.body.position =countPosition + 1

    if(req.body.scheduledDate){
        const scheduledDate = new Date(req.body.scheduledDate)
        req.body.scheduledDate = new Date(scheduledDate.getTime() + 7 * 60 * 60 * 1000)
        if(req.body.scheduledDate <= new Date()){
            req.flash("success", "Thời gian hẹn không hợp lệ")
            res.redirect("back")
            return
        }
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
    req.body.createdBy = {
        account_id: res.locals.user.id
    }
    req.body.hashtag = hashtagId
  
    const post = new Post(req.body)
    await post.save()
  
    req.flash("success", "Tạo bài viết thành công")

    res.redirect(`${systemConfig.prefixAdmin}/posts`)
    // console.log(req.body)
    // res.send("OK")
   
}

//[GET] admin/posts/edit/:id
module.exports.edit = async (req, res)=>{
    const formatDate = (date) => {
        return date.toISOString().slice(0, 16);
    };
    const records = await Category.find({
        deleted: false
    })
    const category = helperCreateTree.tree(records)

    const id = req.params.id
    const post = await Post.findOne({
        _id: id,
        deleted: false
    })
    const date = post.scheduledDate ? formatDate(post.scheduledDate) : ''
    post.date = date
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
        category: category
    })
}

//[PATCH] admin/posts/edit/:id
module.exports.editPatch = async (req, res)=>{
    const id = req.params.id
    
    req.body.hashtag = req.body.hashtag.split(", ")

    if(req.file){
        req.body.thumbnail = `/uploads/${req.file.filename}`
    }

    if(req.body.scheduledDate){
        const scheduledDate = new Date(req.body.scheduledDate)
        req.body.scheduledDate = new Date(scheduledDate.getTime() + 7 * 60 * 60 * 1000)
        if(req.body.scheduledDate <= new Date()){
            req.flash("success", "Thời gian hẹn không hợp lệ")
            res.redirect("back")
            return
        }
    }  

    // if(!req.body.scheduledDate){
    //     await isPublicHelper.publishPost(id)
    // }
  
    const hashtag = req.body.hashtag
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

    await Post.updateOne({_id: id }, req.body)
    

    req.flash("success", "Sửa bài viết thành công")

    res.redirect("back")
}


//[GET] admin/search/suggest
module.exports.suggest = async (req, res)=>{
    const keyword = req.query.keyword
    
    let newHashtag = []
    if(keyword){
        const keywordRegex = new RegExp(keyword, "i")

        const stringSlug = convertToSlugHelper.convertToSlug(keyword)
        const stringSlugRegex = new RegExp(stringSlug, "i")

        const hashtag = await Hashtag.find({
            $or: [
                { title: keywordRegex },
                { slug: stringSlugRegex}
            ]
        })
        for (const item of hashtag) {
            newHashtag.push({
                hashtag: item.title
            })
        }
        
    }
    
    res.json({
        code:200,
        message: "Thành công!",
        hashtag: newHashtag
    })
}

//[DELETE] admin/posts/delete/:id
module.exports.delete = async (req, res)=>{
    const id = req.params.id
    await Post.updateOne({_id: id }, {deleted: true})
    req.flash("success", "Xóa bài viết thành công")

    res.redirect("back")
    
}

//[Patch] /admin/posts/change-status/:status/:id
module.exports.changeStatus = async(req, res) => {
    const status = req.params.status
    const id = req.params.id;

    await Post.updateOne({ _id: id }, 
        {   status: status });

    req.flash("success", "Cập nhật trạng thái thành công!")
    res.redirect("back");
}
//[PATCH] /admin/posts/change-multi
module.exports.changeMulti = async (req, res) => {
    const type = req.body.type;
    const ids = req.body.ids.split(", ");
    
    switch (type) {
     case "posted":
         await Post.updateMany({ _id: { $in: ids} }, {
             status: "posted",
            //  $push: { updatedBy: updatedBy }
            });
         req.flash("success", "Đăng bài viết thành công")
         break;
     case "draft":
         await Post.updateMany({ _id: { $in: ids} }, { 
            status: "draft",
            // $push: { updatedBy: updatedBy }
         }); 
         req.flash("success", "Chuyển bản nháp thành công ")
         break;
    case "delete-all":
        await Post.updateMany({ _id: { $in: ids} }, {
            deleted: true,
            // deletedBy:{
            //     account_id: res.locals.user.id,
            //     // deletedAt: new Date()
            // }
        }); 
        req.flash("success", " Đã xóa thành công!")
        break;
     default:
        req.flash("error", " Lỗi")
         break;
    }
    res.redirect("back");
    // res.send("OK")
 }
