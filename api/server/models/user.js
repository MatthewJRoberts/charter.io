const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const _ = require('lodash');

const config = require('./../config');
    let UserSchema = new mongoose.Schema({
    username: {
        type:String,
        required:true,
        minlength: 3
    },
    password: {
        type:String,
        required:true,
        minlength:6
    },
    info: {
        display_name: {
            type:String,
            default:null
        },
        image: {
            type:String,
            default:null
        },
        email: {
            type: String
        }
    },
    token: {
        type:String
    }
});

UserSchema.methods.toJSON = function() {
    let user = this;
    let userObj = user.toObject();

    return _.pick(userObj, ['_id', 'username', 'info']);
};

UserSchema.methods.hashPassword = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null);
};

UserSchema.methods.verifyPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
};

UserSchema.methods.generateAuthToken = function() {
    let user = this;
    const cert = config.private_key;
    const access = 'auth';
    let token = jwt.sign({
        _id: user._id.toHexString(),
        access
    }, cert).toString();

    user.token = token;
    return user.save().then(() => {
        return token;
    }).catch(e => {
        return Promise.reject();
    });
};

UserSchema.methods.removeToken = function(_token) {
    let user = this;
    user.token = null;
    return user;
};

UserSchema.statics.findByToken = function(token) {
    const cert = config.private_key;
    let User = this;
    let decoded;

    try {
        decoded = jwt.verify(token, cert);
    } catch (e) {
        return Promise.reject();
    }

    return User.findOne({
        '_id': decoded._id,
        'token': token
    });
};

UserSchema.statics.findByCredentials = function(username, password) {
    let User = this;
    return User.findOne({username: username}).then((user) => {
        if(!user) {
            return Promise.reject();
        }
        if(!user.verifyPassword(password)) {
            return Promise.reject();
        }
        return Promise.resolve(user);
    });
};

let User = mongoose.model('User', UserSchema, 'users');
module.exports = { User };