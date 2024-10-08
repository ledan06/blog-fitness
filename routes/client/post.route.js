const express = require('express')
const router = express.Router()
const controller = require("../../controllers/client/post.controller")

const middlewareUser = require("../../middleware/client/user.middlewares")
router.get('/detail/:slug', controller.index)
router.get('/:slugCategory', controller.category)
router.patch('/like/:typeLike/:idPost',middlewareUser.checkLogin, controller.like)
router.post('/comment/:idPost', controller.comment)
router.delete('/delete/:idComment', controller.commentDelete)

module.exports = router;