const express = require('express');
const multer = require("multer");
const path = require('path');
const {nanoid} = require("nanoid");
const Comments = require('../models/CommentSchema');
const config = require('../config');
const auth = require("../middleware/auth");
const router = express.Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, config.uploadPath);
    },
    filename: (req, file, cb) => {
        cb(null, nanoid(5) + path.extname(file.original.name));
    }
});

const upload = multer({storage});

router.post('/', auth, upload.single('image'), async (req, res)=>{
    const data = req.body;
    console.log(data);
    if(data.author && data.post && data.text) {
        try {
            const comment = await new Comments(data);
            comment.createDate();
            await comment.save();
            res.send(comment);
        } catch (error) {
            res.status(400).send(error);
        }
    } else {
        res.status(400).send('Some data are missing, check your inputs')
    }
});

router.get('/', async (req, res)=>{
    try {
        const data = await Comments.find().populate('author').sort({datetime:-1});
        res.send(data);
    } catch (e) {
        res.status(500).send({message:'Something went wrong', error:e});
    };
});

module.exports = router;