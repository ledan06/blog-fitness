const express = require('express')
const router = express.Router()
const controller = require("../../controllers/admin/search.controller")

router.get('/', controller.result)

module.exports = router;