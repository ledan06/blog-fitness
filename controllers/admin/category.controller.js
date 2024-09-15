const Category = require("../../models/category.model")
const systemConfig = require("../../config/system")
const helperCreateTree = require("../../helper/createTree")
//[GET] admin/posts-category
module.exports.index = async (req, res)=>{
    const category = await Category.find({
        deleted: false
    })
    const newRecords = helperCreateTree.tree(category)
    console.log(newRecords)
    res.render("admin/pages/category/index", {
        pageTitle: "Danh mục",
        records: newRecords
    })
}

//[GET] admin/posts-category/create
module.exports.create = async (req, res)=>{
    const records = await Category.find({
        deleted: false
    })
    
    const newRecords = helperCreateTree.tree(records)
    res.render("admin/pages/category/create", {
        pageTitle: "Tạo Danh mục",
        records: newRecords
    })
}

//[POST] admin/posts-category/create
module.exports.createPost = async (req, res)=>{
    const category = new Category(req.body)
    await category.save()
    req.flash("success", "Tạo danh mục thành công")

    res.redirect(`${systemConfig.prefixAdmin}/posts-category`)
}