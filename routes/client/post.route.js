const express = require('express')
const router = express.Router()
const controller = require("../../controllers/client/post.controller")


router.get('/detail/:slug', controller.index)

module.exports = router;