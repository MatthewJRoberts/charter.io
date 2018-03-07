var { User } = require('./../models/user');

var authenticate = (req, res, next) => {
    let token = req.headers['x-auth'];
    User.findByToken(token).then((user) => {
        if(!user) {
            return Promise.reject();
        }
        req.user = user;
        req.token = token;
        next();
    }).catch((e) => {
        return res.status(401).send();
    });
};

module.exports = { authenticate };