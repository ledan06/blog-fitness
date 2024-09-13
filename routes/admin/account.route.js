const express = require('express')
const multer = require("multer");
const router = express.Router()


const controller = require("../../controllers/admin/account.controller")


router.get('/', controller.index)
router.get('/create', controller.create)


module.exports = router;