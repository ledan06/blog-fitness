//[GET] admin/auth/login
module.exports.login = (req, res)=>{
    res.render("admin/pages/auth/login", {
        pageTitle: "Đăng nhập "
    })
}

//[POST] admin/auth/login
module.exports.loginPost = (req, res)=>{
    console.log(req.body)
    res.send("OK")
}