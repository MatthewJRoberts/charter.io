const mongoose = require('mongoose');

let BookingSchema = new mongoose.Schema({
    customer: {
        fullname: {
            type: String,
            required: true
        },
        message: {
            type: String
        },
        contact: {
            email: {
                type: String
            },
            phone: {
                type: String
            }
        }
    },
    date: {
        start: {
            type: Number,
            required: true
        },
        end: {
            type: Number,
            required: true
        }
    },
    userid: {
        type: String,
        required: true
    },
    accepted: {
        type: Boolean,
        default: false
    }
});

let Booking = mongoose.model('Booking', BookingSchema, 'bookings');

module.exports = { Booking };