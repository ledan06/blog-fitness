const homeRouter = require("./home.route")
const postRouter = require("./post.route")
module.exports = (app) => {
    app.use("/", homeRouter)
    app.use("/post", postRouter)
}