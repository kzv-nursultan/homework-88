const mongoose = require('mongoose');
const config = require('./config');
const Users = require("./models/UserSchema");
const Posts = require("./models/PostSchema");
const Comments = require("./models/CommentSchema");
const {nanoid} = require("nanoid");

const run = async () => {
    await mongoose.connect(config.db.url, config.db.options);
    const collections = await mongoose.connection.db.listCollections().toArray();
    for (const coll of collections) {
        await mongoose.connection.db.dropCollection(coll.name);
    }

    const [user1, user2, user3] = await Users.create({
        username: 'user001',
        password: 'user001',
        token: nanoid()
    },{
        username: 'user002',
        password: 'user002',
        token: nanoid()
    },{
        username: 'user003',
        password: 'user003',
        token: nanoid()
    });

    const [post1, post2, post3] = await Posts.create({
        title:'Hello again',
        author: user1,
        datetime: new Date(),
        description: 'Here goes description',
        image: '/fixtures/post1.png'
    },{
        title:'here goes title',
        author: user2,
        datetime: new Date(),
        description: 'Some description'
    },{
        title: 'Title of post',
        author: user3,
        datetime: new Date(),
        description: 'the description',
        image: '/fixtures/post2.png'
    });

    await Comments.create({
        post: post1,
        author: user2,
        text:'some comment text',
        datetime: new Date(),
    },{
        post: post1,
        author: user3,
        text: 'another comment text',
        datetime: new Date(),
    }, {
        post: post2,
        author: user1,
        text: 'here goes comment text',
        datetime: new Date(),
    },{
        post: post3,
        author: user1,
        text:'some text',
        datetime: new Date(),
    });

    await mongoose.connection.close();
};

run().catch(console.error);