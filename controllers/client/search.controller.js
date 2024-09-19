const convertToSlug = require("../../helper/convertToSlug")
const Post = require("../../models/post.model")
module.exports.result = async(req, res) => {
    const keyword = req.query.keyword
    const type = req.params.type
    const listpost = []

    const result = new RegExp(keyword, "i")

    const slug = convertToSlug.convertToSlug(keyword)

    const resultSlug = new RegExp(slug, "i")
    const posts = await Post.find({
        $or: [
            { title: result, deleted: false, status: "posted"},
            { slug: resultSlug, deleted: false, status: "posted"}
        ]
    })

    for (const item of posts) {
        listpost.push({
            title: item.title,
            thumbnail: item.thumbnail,
            slug: item.slug
        })
    }
    

    switch (type) {
        case "result":
            res.render("client/pages/search/result", {
                pageTitle: `Kết quả của ${keyword}`,
                posts: listpost,
                keyword: keyword
            })
            break;
        case "suggest":
            res.json({
                code: 200,
                message: "thành công",
                posts: listpost
            })      
            break;
        default:
            break;
    }
    
}