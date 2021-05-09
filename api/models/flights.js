const mongoose = require('mongoose');

const flightSchema = mongoose.Schema({
    FlightName: {
        type: String,
        required: true
    },
    flightNumber: {
        type: Number,
        required: true,
        unique: true
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
    date: {
        type: String
    },
    price: {
        type: String
    }
});

module.exports = mongoose.model('Flight', flightSchema)