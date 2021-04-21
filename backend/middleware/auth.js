const Users = require('../models/UserSchema');

const auth = async (req, res, next) => {
    const token = req.get('Authorization');

    if(!token) {
        return res.status(401).send('Token not exist. Please sign in');
    };

    const user = Users.findOne({token});

    if (!user) {
        return res.status(401).send('')
    };

    req.user = user;
    next()
};

module.exports = auth;