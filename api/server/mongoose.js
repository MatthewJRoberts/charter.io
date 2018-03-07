const mongoose = require('mongoose');
const config = require('./config');

mongoose.Promise = global.Promise;

mongoose.connect(config.database).then(() => {
    // Success Case
}, (e) => {
    console.log(`Failed to connect to MongoDB: ${e}`);
});

module.exports = { mongoose };