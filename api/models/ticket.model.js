const mongoose = require('mongoose');
const moment = require('moment'); // user to get data in poper format

const ticketSchema = mongoose.Schema({
    ticketNumber: {
        type: String
    },
    FlightName: {
        type: String,
        required: true
    },
    flightNumber: {
        type: Number,
        required: true
    },
    departLocation: {
        type: String,

    },
    arrivelLocation: {
        type: String,
    },
    departTime: {
        type: String
    },
    arriveTime: {
        type: String
    },
    ownerName: {
        type: String,
        required: true
    },
    ownerEmail: {
        type: String,
        required: true
    },
    status: {
        type: String,
        default: 'live'
    },
    date: {
        type: String
    },
    payment: {
        type: String,
        default: 'Not Paid'
    },
    bookDate: {
        type: String,
        default: moment().format('LL')
    },
    price: {
        type: String,
    }


});

module.exports = mongoose.model('ticket', ticketSchema)