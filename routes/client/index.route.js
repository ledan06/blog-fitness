const homeRouter = require("./home.route")
const postRouter = require("./post.route")
const searchRouter = require("./search.route")
const categoryMiddleware = require("../../middleware/client/category.middleware")
module.exports = (app) => {
    app.use(categoryMiddleware.category)

    app.use("/", homeRouter)
    app.use("/post", postRouter)
    app.use("/search", searchRouter)
}