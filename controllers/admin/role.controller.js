const systemConfig = require("../../config/system")
const Role = require("../../models/roles.model")

//[GET] admin/roles
module.exports.index = async (req, res)=>{
    const find = {
        deleted: false
    }
    const records = await Role.find(find)
    res.render("admin/pages/role/index", {
        pageTitle: "Nhóm Quyền",
        records: records
    })
}

//[GET] admin/roles/create
module.exports.create = (req, res)=>{
    res.render("admin/pages/role/create", {
        pageTitle: "Tạo nhóm quyền"
    })
}

//[POST] admin/roles/create
module.exports.createPost = async (req, res)=>{
    const role = new Role(req.body)
    await role.save()
    req.flash("success", "Tạo quyền thành công")

    res.redirect(`${systemConfig.prefixAdmin}/roles`)
}

//[GET] admin/roles/edit
module.exports.edit = async (req, res)=>{
    const id = req.params.id
    const role = await Role.findOne({
        deleted: false,
        _id: id
    })
    res.render("admin/pages/role/edit", {
        pageTitle: "Chỉnh sửa nhóm quyền",
        data: role
    })
}

//[PATCH] admin/roles/edit/:id
module.exports.editPatch = async (req, res)=>{
    const id = req.params.id

    await Role.updateOne({_id: id}, req.body)
    req.flash("success", "Cập nhật thành công")

    res.redirect(`${systemConfig.prefixAdmin}/roles`)
}


//[DELETE] admin/roles/delete/:id
module.exports.delete = async (req, res)=>{
    const id = req.params.id

    await Role.updateOne({_id: id}, { deleted: true })
    req.flash("success", "Đã xóa")

    res.redirect(`${systemConfig.prefixAdmin}/roles`)
}

//[GET] admin/roles/permissions
module.exports.permission = async (req, res)=>{
    const roles = await Role.find({
        deleted: false
    })
    res.render("admin/pages/role/permission", {
        pageTitle: "Phân quyền",
        records: roles
    })
}

//[PATCH] admin/roles/permissions
module.exports.permissionPatch = async (req, res)=>{
    const permission = JSON.parse(req.body.permissions)
    for (const item of permission) {
        await Role.updateOne({ _id: item.id}, {permissions: item.permissions} )
    }
    req.flash("success", "Cập nhật thành công")
    res.redirect("back")
}