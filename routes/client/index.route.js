const homeRouter = require("./home.route")
const postRouter = require("./post.route")
const searchRouter = require("./search.route")
const userRouter = require("./user.route")

const categoryMiddleware = require("../../middleware/client/category.middleware")
const userMiddleware = require("../../middleware/client/user.middlewares")
module.exports = (app) => {
    app.use(categoryMiddleware.category)
    app.use(userMiddleware.infoUser)

    app.use("/", homeRouter)
    app.use("/post", postRouter)
    app.use("/search", searchRouter)
    app.use("/user", userRouter)
}