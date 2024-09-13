const Account = require("../../models/account.model")
//[GET] admin/account
module.exports.index = async (req, res)=>{
    const records = await Account.find({
        deleted: false,
    })
    res.render("admin/pages/account/index", {
        pageTitle: "Đăng ký",
        records: records
    })
}


//[GET] admin/account/create
module.exports.create = (req, res)=>{
    res.render("admin/pages/account/create", {
        pageTitle: "Tạo tài khoản"
    })
}
