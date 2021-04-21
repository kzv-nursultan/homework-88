const express = require('express');
const Users = require('../models/UserSchema');
const router = express.Router();

router.post('/', async (req, res)=>{
    console.log(req.body);
    try {
        const newUser = new Users(req.body);
        await newUser.save();
        res.send(newUser);
    } catch (e) {
        res.status(400).send(e);
    };
});

router.get('/', async (req, res)=>{
    try {
        const users = await Users.find();
        res.send(users);
    } catch (e) {
        res.status(500).send(e);
    };
});

router.post('/session', async (req, res)=>{
    const data = req.body;
    console.log(data.password);
    const user = await Users.findOne({username: data.username});
    if (!user) {
        return res.status(400).send({error:'User not found'});
    };
    const isMatch = await user.checkPassword(data.password);
    if(!isMatch) {
        return(res.status(400).send({error:'User not found(pass)'}));
    };

    try {
        await user.generateToken();
        await user.save();
        res.status(200).send({message:'user and password are correct', user});
    } catch (e) {
        res.status(500).send(e);
    };
});

router.delete('/:id', async (req,res)=>{
    try {
        await Users.findByIdAndDelete(req.params.id);
        const data = await Users.find();
        res.send(data);
    } catch (e) {
        res.status(500).send(e);
    }
});

module.exports = router;
