const express = require('express');
const path = require('path');
const Posts = require('../models/PostSchema');
const auth = require('../middleware/auth');
const multer = require("multer");
const config = require('../config');
const {nanoid} = require("nanoid");
const router = express.Router();

const storage = multer.diskStorage({
    destination: (req,file, cb) => {
        cb(null, config.uploadPath);
    },
    filename: (req, file, cb) => {
        cb(null, nanoid(5) + path.extname(file.original.name));
    }
});

const upload = multer({storage});

router.get('/', async (req, res)=>{
    try {
        const data = await Posts.find().populate('author').sort({datetime:-1});
        res.send(data);
    } catch (e) {
        res.status(500).send(e);
    };
});

router.post('/', auth, upload.single('image'), async (req, res)=>{
    const data = req.body;
    if(data.title && data.author) {
        try {
            if (req.file) {
                data.image = '/uploads' + req.file.filename;
            };
            const newPost = await new Posts(data);
            newPost.createDate();
            await newPost.save();
            res.status(200).send(newPost);
        } catch (e) {
            res.status(500).send(e);
        };
    } else {
        res.status(400).send('Check your inputs');
    }
});

module.exports = router;