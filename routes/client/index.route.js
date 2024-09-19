const homeRouter = require("./home.route")
const postRouter = require("./post.route")
const searchRouter = require("./search.route")
module.exports = (app) => {
    app.use("/", homeRouter)
    app.use("/post", postRouter)
    app.use("/search", searchRouter)
}