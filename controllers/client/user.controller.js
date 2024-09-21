const User = require("../../models/user.model")
const md5 = require("md5")
//[GET] user/register
module.exports.register = async(req, res)=> {
    res.render("client/pages/user/register", {
        pageTitle: "Đăng ký"
    })
}

//[POST] user/register
module.exports.registerPost = async(req, res)=> {
    const {fullName, email, password} = req.body
    const user = await User.findOne({
        deleted: false,
        email: email
    })
    if(user){
        req.flash("error", "Gmail đã tồn tại")
        res.redirect("back")
        return
    }
    else{
        req.body.password = md5(password)
        const userNew = new User(req.body)
        await userNew.save()

        res.cookie("tokenUser", userNew.tokenUser)

        req.flash("success", "Tạo tài khoản thành công")
        res.redirect("/")
    }
}

//[GET] user/login
module.exports.login = async(req, res)=> {
    res.render("client/pages/user/login", {
        pageTitle: "Đăng nhập"
    })
}

//[POST] user/login
module.exports.loginPost = async(req, res)=> {
    const email = req.body.email
    const password = req.body.password

    const user = await User.findOne({
        deleted: false,
        email: email
    })


    if(!user){
        req.flash("error", "Gmail không chính xác")
        res.redirect("back")
        return
    }
    if(md5(password) !== user.password){
        req.flash("error", "Sai mật khẩu")
        res.redirect("back")
        return;
    }
    if(user.status === "inactive"){
        req.flash("error", "Tài khoản đang bị khóa!")
        res.redirect("back")
        return;
    }
    res.cookie("tokenUser", user.tokenUser)
    req.flash("success", "Đăng nhập thành công")
    res.redirect("/")
}

//[GET] user/logout
module.exports.logout = async(req, res)=> {
    res.clearCookie("tokenUser")
    res.redirect("/")
}