const dashboardRoutes = require("./dashboard.route")
const postRoutes = require("./post.route")
const searchRoutes = require("./search.route")
const authRoutes = require("./auth.route")
const roleRoutes = require("./role.route")
const accountRoutes = require("./account.route")

module.exports = (app)=>{
    app.use("/admin/dashboard", dashboardRoutes);
    app.use("/admin/posts", postRoutes);
    app.use("/admin/search", searchRoutes);
    app.use("/admin/auth", authRoutes);
    app.use("/admin/roles", roleRoutes);
    app.use("/admin/accounts", accountRoutes);
}