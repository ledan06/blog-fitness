const express = require('express')
const multer = require("multer")
const router = express.Router()
const storageMulter = require("../../helper/storageMulter")
const upload = multer({ storage: storageMulter() })

const controller = require("../../controllers/admin/post.controller")

router.get('/', controller.index)
router.get('/create', controller.create)
router.post(
    '/create',
    upload.single('thumbnail'),
    controller.createPost
)
router.get('/edit/:id', controller.edit)

router.patch(
    '/edit/:id',
    upload.single('thumbnail'),
    controller.editPatch
)

router.get('/suggest', controller.suggest)

router.delete('/delete/:id', controller.delete)

router.patch('/change-status/:status/:id', controller.changeStatus)

router.patch('/change-multi', controller.changeMulti);


module.exports = router;