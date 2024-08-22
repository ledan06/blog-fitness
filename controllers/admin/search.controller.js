const Post = require("../../models/post.model")
const hashtagHelper = require("../../helper/hashtag.helper")
const convertToSlugHelper = require("../../helper/convertToSlug")
module.exports.result = async (req, res)=>{
    const keyword = req.query.keyword
    let newPosts = []
    if(keyword){
        const keywordRegex = new RegExp(keyword, "i")

        const stringSlug = convertToSlugHelper.convertToSlug(keyword)
        const stringSlugRegex = new RegExp(stringSlug, "i")

        const posts = await Post.find({
            $or: [
                { title: keywordRegex },
                { slug: stringSlugRegex}
            ]
        })
        newPosts = await hashtagHelper.hashtag(posts)
    }

    res.render("admin/pages/search/result", {
        pageTitle: `Kết quả của ${keyword}`,
        posts: newPosts,
        keyword: keyword
    })
}