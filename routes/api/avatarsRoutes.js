const express = require("express");
const multer  = require('multer')
const path = require('path')
const router = new express.Router();
const {avatarsUser} = require("../../controller/avatarController");
const {authMiddleware} = require("../../middleware/authMiddleware")

const { v4: uuidv4 } = require('uuid');
const FILE_DIR = path.resolve('./tmp')
const storage = multer.diskStorage( {
    destination: (req, file, cb) =>{
        cb(null, FILE_DIR)
    },
    filename: (req, file, cb) =>{
        const [, extention ] = file.originalname.split('.');
    cb(null, `${uuidv4()}.${extention}`)
    }
})

const uploadMiddleware = multer({storage});


router.patch('/users/avatars', uploadMiddleware.single("avatar"),authMiddleware, avatarsUser)
router.use('/users/download', express.static(FILE_DIR))

module.exports = router