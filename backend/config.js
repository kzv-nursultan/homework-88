const path = require('path');
const rootPath = __dirname;

module.exports = {
    rootPath,
    uploadPath: path.join(rootPath, 'public/uploads'),
    db: {
        url: 'mongodb://localhost/forumApi',
        options: {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false
        },
    }
};