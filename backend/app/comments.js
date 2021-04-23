const express = require('express');
const multer = require("multer");
const path = require('path');
const {nanoid} = require("nanoid");
const Comments = require('../models/CommentSchema');
const config = require('../config');
const auth = require("../middleware/auth");
const router = express.Router();


router.post('/', auth, async (req, res)=>{
    const data = req.body;
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

router.get('/:id', async (req,res)=>{
    const id = req.params.id;
    try {
        const data = await Comments.find({post:id}).populate('author').sort({datetime:-1});
        res.send(data);
    } catch (error) {
        res.status(500).send(error);
    };
})

module.exports = router;