const express = require('express');
const _ = require('lodash');
const { ObjectID } = require('mongodb');
let router = express.Router();

let { mongoose } = require('./../mongoose');

let { User } = require('./../models/user');
let { authenticate } = require('./../middleware/authenticate');

router.get('/', (req, res) => {
    User.find({}).then((docs) => {
        if(!docs) {
            return res.status(404).send();
        }
        return res.status(200).json(docs);
    }).catch(e => res.status(500).send());
});

router.get('/:id', (req, res) => {
    const id = req.params.id;
    if(!ObjectID.isValid(id)) {
        return res.status(400).send();
    }
    User.findById(id).then(user => {
        if(!user) {
            return res.status(404).send();
        }
        return res.status(200).json(user);
    }).catch(e => res.status(500).send());
});

router.post('/', (req, res) => {
    let body = _.pick(req.body, ['username', 'password', 'info']);
    if(body.password.length < 6 || body.username < 3) {
        return res.status(400).send();
    }

    let user = new User(body);
    user.username = body.username;
    user.password = user.hashPassword(user.password);

    user.save().then(() => {
        if(!user) {
            return res.status(404).send();
        }
        
        return user.generateAuthToken();
    }).then((token) => {
        return res.status(200).json({user, token});
    }).catch(e => res.status(400).send());
});

// router.delete('/:id', (req, res) => {
//     let id = req.params.id;
//     if(!ObjectID.isValid(id)) {
//         return res.status(400).send();
//     }
//     User.findByIdAndRemove(id).then(user => {
//         if(!user) {
//             return res.status(404).send();
//         }
//         return res.status(200).json(user);
//     }).catch(e => return res.status(500).send());
// });

router.post('/profile/login', (req, res) => {
    let body = _.pick(req.body, ['username', 'password']);
    User.findByCredentials(body.username, body.password).then((user) => {
        return user.generateAuthToken().then(token => {
            res.status(200).json({user, token});
        }).catch(e => {
            res.status(401).send();
        });
    }).catch(e => res.status(400).send());
});

router.post('/profile/token', authenticate, (req, res) => {
    User.findByToken(req.token).then(user => {
        return user.generateAuthToken().then(token => {
            res.status(200).json({user, token});
        }).catch(e => res.status(401).send());
    }).catch(e => res.status(500).send());
});

router.put('/', authenticate, (req, res) => {
    let body = _.pick(req.body, ['info']);
    User.findByIdAndUpdate(req.user._id, {$set: body}, {new: true})
        .then(user => {
            if(!user) {
                return res.status(404).send();
            }
            return res.status(200).json(user);
        }).catch(e => res.status(500).send());
});

router.get('/profile/me', authenticate, (req, res) => {
    res.status(200).json(req.user);
});

router.put('/profile/logout', authenticate, (req, res) => {
    let user = req.user;
    user.removeToken(req.token).save().then(user => {
        if(!user) {
            return res.status(404).send();
        }
        return res.status(200).json(user);
    }).catch(e => res.status(500).send());
});

module.exports = router;