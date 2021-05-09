const express = require('express');
const TicketModel = require('../models/ticket.model');
const router = express.Router();
const { HttpError } = require('../utils/utils');
const mongoose = require('mongoose');
let nodemailer = require('nodemailer');

//book ticket route
router.post("/bookTicket", async(req, res, next) => {
    let name = req.body.ownerName;
    let email = req.body.ownerEmail;
    try {
        const ticket = await TicketModel.create({
            ticketNumber: new mongoose.Types.ObjectId(),
            ownerName: req.body.ownerName,
            ownerEmail: req.body.ownerEmail,
            FlightName: req.body.FlightName,
            flightNumber: req.body.flightNumber,
            departLocation: req.body.departLocation,
            arrivelLocation: req.body.arrivelLocation,
            departTime: req.body.departTime,
            arriveTime: req.body.arriveTime,
            status: req.body.status,
            date: req.body.date,
            payment: req.body.payment,
            bookDate: req.body.bookDate,
            price: req.body.price,

        })
        let transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                user: process.env.SCREAT_EMAIL,
                pass: process.env.SCREAT_EMAIL_PASS
            }
        });

        let mailOptions = {
            from: process.env.SCREAT_EMAIL,
            to: email,
            subject: "About Air ticket Reservation From AirlineRes",
            text: 'Mr/Ms ' + name + "," + '\n \nYou booked your ticket succesfully..' +
                "\nFlight Number is: " + req.body.flightNumber + "\n More Details About Your Flight..\nFlight Name is: " + req.body.FlightName + "\nDate is: " + req.body.date +
                "\nDepart Time is: " + req.body.departTime + "\n\nThis is auto genarated email by AirlineRes. Do not reply to this.\n\n\nBest Regards,\nAdmin\nAirlineRes"
        };

        transporter.sendMail(mailOptions, function(error, info) {
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        });
        res.json(ticket)
    } catch (e) {
        next(e)
    }
})

//disply tickets through owner email
router.get("/myTickets/:email", async(req, res, next) => {
    try {
        const email = req.params.email;
        const ticket = await TicketModel.find({ ownerEmail: email })
        if (ticket == '') {
            return res.status(404).json({
                error: true,
                message: "No Tickets Found .."
            })
        }
        res.json(ticket)
    } catch (e) {
        res.status(500).json({
            error: true,
            message: e.message
        })
    }
})

//Display all Tickets
router.get("/tickets", async(req, res, next) => {
    try {
        const ticket = await TicketModel.find()
        if (ticket == '') {
            return res.status(404).json({
                error: true,
                message: "No Ticketss Found .."
            })
        }
        res.json(ticket)
    } catch (e) {
        res.status(500).json({
            error: true,
            message: e.message
        })
    }

})

//cancel ticket
router.put("/canselTicket/:id", async(req, res, next) => {
    try {
        const ticket = await TicketModel.findByIdAndUpdate({ _id: req.params.id }, {
            status: req.body.status,

        }, {
            new: true,
            useFindAndModify: false,
            upsert: true
        })

        res.json(ticket)
    } catch (e) {
        next(e)
    }
})

//update payment informations
router.put("/ticketPayment/:id", async(req, res, next) => {
        try {
            const ticket = await TicketModel.findByIdAndUpdate({ _id: req.params.id }, {
                payment: req.body.payment,

            }, {
                new: true,
                useFindAndModify: false,
                upsert: true
            })

            res.json(ticket)
        } catch (e) {
            next(e)
        }
    })
    //update ticket informations
router.put("/updateTicket/:id", async(req, res, next) => {
    try {
        const ticket = await TicketModel.findByIdAndUpdate({ _id: req.params.id }, {
            FlightName: req.body.FlightName,
            flightNumber: req.body.flightNumber,
            departTime: req.body.departTime,
            arriveTime: req.body.arriveTime
        }, {
            new: true,
            useFindAndModify: false,
            upsert: true
        })

        res.json(ticket)
    } catch (e) {
        next(e)
    }
})

module.exports = router