const router = require('express').Router();
const { ObjectID } = require('mongodb');
const _ = require('lodash');

let { authenticate } = require('./../middleware/authenticate');
let { Booking } = require('./../models/booking');

router.get('/', ( req, res ) => {
    Booking.find().then(bookings => {
        if(!bookings) {
            return res.status(404).send();
        }
        return res.status(200).json(bookings);
    }).catch(e => res.status(500).send());
});

router.get('/:id', ( req, res ) => {
    let id = req.params.id;
    if(!ObjectID.isValid(id)) {
        return res.status(400).send();
    }
    Booking.findById(id).then(booking => {
        if(!booking) {
            return res.status(404).send();
        }
        return res.status(200).json(booking);
    }).catch(e => res.status(500).send());
});

router.get('/all/:userid', ( req, res ) => {
    let userid = req.params.userid;
    if(!ObjectID.isValid(userid)) {
        return res.status(400).send();
    }
    Booking.find({userid}).then(bookings => {
        if(!bookings) {
            return res.status(404).send();
        }
        return res.status(200).json(bookings);
    }).catch(e => res.status(500).send());
});

router.get('/all/accepted/:userid', ( req, res ) => {
    let userid = req.params.userid;
    if(!ObjectID.isValid(userid)) {
        return res.status(400).send();
    }
    Booking.find({userid}).where('accepted').equals(true).then(bookings => {
        if(!bookings) {
            return res.status(404).send();
        }
        return res.status(200).json(bookings);
    }).catch(e => res.status(500).send());
});

router.post('/', ( req, res ) => {
    let body = _.pick(req.body, ['userid', 'date', 'customer', 'accepted']);
    let newBookings = new Booking(body);
    newBookings.save().then(booking => {
        if(!booking) {
            return res.status(404).send();
        }
        return res.status(200).json(booking);
    }).catch(e => res.status(500).send());
});

router.put('/:id', authenticate, ( req, res ) => {
    let id = req.params.id;
    let body = _.pick(req.body, ['userid', 'date', 'customer', 'accepted']);
    if(!ObjectID.isValid(id)) {
        return res.status(400).send();
    }
    if(req.user._id != body.userid) {
        return res.status(401).send();
    }
    
    Booking.findByIdAndUpdate(id, {$set: body}, {new: true}).then(booking => {
        if(!booking) {
            return res.status(404).send();
        }
        return res.status(200).json(booking);
    }).catch(e => res.status(500).send());
});

router.delete('/:id', authenticate, ( req, res ) => {
    let id = req.params.id;
    if(!ObjectID.isValid(id)) {
        return res.status(400).send();
    }

    Booking.findById(id).then(booking => {
        if(!booking) {
            return res.status(404).send();
        }
        if(booking.userid != req.user._id) {
            return res.status(401).send();
        }
        booking.remove().then(booking => {
            return res.status(200).json(booking);
        }).catch(e => Promise.reject());
    }).catch(e => res.status(500).send());

    // Booking.findByIdAndRemove(id).then(booking => {
    //     if(!booking) {
    //         return res.status(404).send();
    //     }
    //     return res.status(200).json(booking);
    // }).catch(e => res.status(500).send());
});

module.exports = router;