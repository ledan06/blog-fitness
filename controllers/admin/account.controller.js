const md5 = require("md5")

const Account = require("../../models/account.model")
const Role = require("../../models/roles.model")
const systemConfig = require("../../config/system")
//[GET] admin/account
module.exports.index = async (req, res)=>{
    const records = await Account.find({
        deleted: false,
    }).select("-password -token")
    for (const record of records) {
        const role = await Role.findOne({
            deleted: false,
            _id: record.role_id
        })
        record.role = role
    }
    res.render("admin/pages/account/index", {
        pageTitle: "Đăng ký",
        records: records
    })
}


//[GET] admin/account/create
module.exports.create = async (req, res)=>{
    const roles = await Role.find({
        deleted: false
    }) 
    res.render("admin/pages/account/create", {
        pageTitle: "Tạo tài khoản",
        roles: roles
    })
}

//[POST] admin/account/create
module.exports.createPost = async (req, res)=>{
    req.body.password = md5(req.body.password)
    const emailExist = await Account.findOne({
        deleted: false,
        email: req.body.email
    })
    if(emailExist){
        req.flash("error", `Email ${req.body.email} đã tồn tại`)
        res.redirect("back")
    }else{
        const account =  new Account(req.body)
        await account.save()
        req.flash("success", "Tạo tài khoản thành công")
        res.redirect(`${systemConfig.prefixAdmin}/accounts`)
    }
}

//[GET] admin/account/edit
module.exports.edit = async (req, res)=>{
    const record = await Account.findOne({
        deleted: false,
        _id: req.params.id
    })
    const role = await Role.find({
        deleted: false
    })
    res.render("admin/pages/account/edit", {
        pageTitle: "Chỉnh sửa tài khoản",
        data: record,
        roles: role
    })
}

//[PATCH] admin/account/edit
module.exports.editPatch = async (req, res)=>{
    const id = req.params.id
    
    const emailExist = await Account.findOne({
        _id: { $ne: id},
        deleted: false,
        email: req.body.email
    })
    if(emailExist){
        req.flash("error", `Email ${req.body.email} đã tồn tại`)
        res.redirect("back")
    }else{
        if(req.body.password){
            req.body.password = md5(req.body.password)
        }else{
            delete req.body.password
        }
        await Account.updateOne({
            _id: id
        }, req.body)
        req.flash("success", "Cập nhật thành công")
        res.redirect(`back`)
    }
}

//[GET] admin/account/detail
module.exports.detail = async (req, res)=>{
    const account = await Account.findOne({
        deleted: false,
        _id: req.params.id
    })
    const role = await Role.findOne({
        deleted: false,
        _id: account.role_id
    }) 
    res.render("admin/pages/account/detail", {
        pageTitle: "Chi tiết tài khoản",
        role: role,
        account: account
    })
}