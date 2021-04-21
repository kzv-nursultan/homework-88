const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const exitHook = require('async-exit-hook');
const config = require('./config');

const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());

app.get('/', (req,res)=>{
    res.send('henlo');
});

const run = async () => {
    const connection = await mongoose.connect(config.db.url, config.db.options);

    app.listen(port, async ()=>{
        console.log('server started on port ' + port);
    });

    exitHook(async callback => {
        await mongoose.disconnect();
        console.log('mongoose was disconnected');
        callback();
    });
};

run().catch(e=>console.error(e));