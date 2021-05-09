const express = require('express');
const FlightModel = require('../models/flights');
const router = express.Router();
const { HttpError } = require('../utils/utils');


//add new flight to the system
router.post("/addFlight", async(req, res, next) => {
    try {
        const flight = await FlightModel.create({
            FlightName: req.body.FlightName,
            flightNumber: req.body.flightNumber,
            departLocation: req.body.departLocation,
            arrivelLocation: req.body.arrivelLocation,
            departTime: req.body.departTime,
            arriveTime: req.body.arriveTime,
            price: req.body.price,
            date: req.body.date

        })
        res.json(flight)
    } catch (e) {
        next(e)
    }
})

//search flight in flight number
router.get("/findFlightByNumber/:flightNumber", async(req, res, next) => {
    try {
        const flightNumber = req.params.flightNumber;
        const flight = await FlightModel.find({ flightNumber: flightNumber })
        if (flight == '') {
            return res.status(404).json({
                error: true,
                message: "No Flight Found on That number.."
            })
        }
        res.json(flight)
    } catch (e) {
        res.status(500).json({
            error: true,
            message: e.message
        })
    }

})

//Display all Flights route
router.get("/", async(req, res, next) => {
    try {
        const flight = await FlightModel.find()
        if (flight == '') {
            return res.status(404).json({
                error: true,
                message: "No Flights Found .."
            })
        }
        res.json(flight)
    } catch (e) {
        res.status(500).json({
            error: true,
            message: e.message
        })
    }

})

//flight details update route
router.put("/updateFlight/:id", async(req, res, next) => {
    try {
        const flight = await FlightModel.findByIdAndUpdate({ _id: req.params.id }, {
            FlightName: req.body.FlightName,
            flightNumber: req.body.flightNumber,
            departLocation: req.body.departLocation,
            arrivelLocation: req.body.arrivelLocation,
            departTime: req.body.departTime,
            arriveTime: req.body.arriveTime,
            date: req.body.date,
            price: req.body.price
        }, {
            new: true,
            useFindAndModify: false,
            upsert: true
        })

        res.json(flight)
    } catch (e) {
        next(e)
    }
})

//flight delete route
router.delete("/deleteFlight/:id", async(req, res, next) => {
    try {
        const flight = await FlightModel.deleteOne({ _id: req.params.id })
        res.json(flight)
    } catch (e) {
        next(e)
    }
})

module.exports = router