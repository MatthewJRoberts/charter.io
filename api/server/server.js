/* NPM Packages */
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

/* Files */
const config = require('./config');
let route_user = require('./routes/user');
let route_booking = require('./routes/booking');

/* App Create */
let app = express();

/* App Setup */
app.use(cors());

app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended:true }));

/* App Routes */
app.use('/user', route_user);
app.use('/booking', route_booking);

/* App Listen */
app.listen(config.port, () => {
    console.log(`Server listening on port: ${ config.port }`);
});
