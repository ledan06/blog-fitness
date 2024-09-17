const dashboardRoutes = require("./dashboard.route")
const postRoutes = require("./post.route")
const searchRoutes = require("./search.route")
const authRoutes = require("./auth.route")
const roleRoutes = require("./role.route")
const accountRoutes = require("./account.route")
const categoryRoutes = require("./category.route")

const authMiddleware = require("../../middleware/admin/auth.middlewares")

module.exports = (app)=>{
    app.use("/admin/dashboard", authMiddleware.requireAuth, dashboardRoutes);
    app.use("/admin/posts", authMiddleware.requireAuth, postRoutes);
    app.use("/admin/search", authMiddleware.requireAuth, searchRoutes);
    app.use("/admin/roles", authMiddleware.requireAuth, roleRoutes);
    app.use("/admin/accounts", authMiddleware.requireAuth, accountRoutes);
    app.use("/admin/posts-category", authMiddleware.requireAuth, categoryRoutes);

    app.use("/admin/auth", authRoutes);
}