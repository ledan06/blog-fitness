const dashboardRoutes = require("./dashboard.route")
const postRoutes = require("./post.route")
const searchRoutes = require("./search.route")

module.exports = (app)=>{
    app.use("/admin/dashboard", dashboardRoutes);
    app.use("/admin/posts", postRoutes);
    app.use("/admin/search", searchRoutes);
}