const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = require('../models/users.js');
const Staff = require('../models/staff.model');
const bcrypt = require('bcryptjs');


//get all customers
router.get('/allUsers', (req, res, next) => {
    User.find()
        .select('name password email phone nic country ')
        .exec()
        .then(docs => {
            console.log(docs);
            if (docs.length >= 1) {
                res.status(200).json(docs);
            } else {
                res.status(404).json({
                    message: 'No Userss Found'
                });
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        })
});

//get customers by email
router.get('/:email', (req, res, next) => {
    const email = req.params.email;
    User.find({ email: email })
        .exec()
        .then(doc => {
            console.log(doc);
            if (doc) {
                res.status(200).json(doc);
            } else {
                res.status(404).json({ message: 'No user Found that Email' });
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: err });
        });
})


//add customer details route
router.put("/addCustomerDetails/:email", (req, res, next) => {
    const email = req.params.email;
    const input = {
        phone: req.body.phone,
        nic: req.body.nic,
        country: req.body.country,
    }
    for (const key of Object.keys(input)) {
        console.log(key, input[key]);
    }

    User.update({ email: email }, { $set: input })
        .exec()
        .then(result => {
            console.log(result);
            res.status(200).json(result);
        })
        .catch(err => {
            console.log('Error found ', err);
            res.status(500).json({
                error: err
            });
        });

});

//update customer details
router.put("/updateCustomer/:email", (req, res, next) => {
    const email = req.params.email;
    const input = {
        country: req.body.country,
        phone: req.body.phone,

    }
    for (const key of Object.keys(input)) {
        console.log(key, input[key]);
    }

    User.update({ email: email }, { $set: input })
        .exec()
        .then(result => {
            console.log(result);
            res.status(200).json(result);
        })
        .catch(err => {
            console.log('Error found ', err);
            res.status(500).json({
                error: err
            });
        });

});

//update staff route
router.put("/updateStaff/:id", (req, res, next) => {
    const id = req.params.id;
    const saltRounds = 10;
    // bcrypt.hash(req.body.password, 10, (err, hash)); //hash the password using bcrypt
    bcrypt.hash(req.body.password, saltRounds, function(err, hash) {
        const input = {
            name: req.body.name,
            phone: req.body.phone,
            epfNumber: req.body.epfNumber,
            designation: req.body.designation,
            password: hash,

        }
        for (const key of Object.keys(input)) {
            console.log(key, input[key]);
        }

        Staff.updateOne({ _id: id }, { $set: input })
            .exec()
            .then(result => {
                console.log(result);
                res.status(200).json(result);
            })
            .catch(err => {
                console.log('Error found ', err);
                res.status(500).json({
                    error: err
                });
            });
    });
});

// Approve Staff Account
router.put("/approveStaff/:id", async(req, res, next) => {
    try {
        const staff = await Staff.findByIdAndUpdate({ _id: req.params.id }, {
            status: req.body.status,

        }, {
            new: true,
            useFindAndModify: false,
            upsert: true
        })

        res.json(staff)
    } catch (e) {
        next(e)
    }
})

//view all staff
router.get("/", async(req, res, next) => {
    try {
        const staff = await Staff.find()
        if (staff == '') {
            return res.status(404).json({
                error: true,
                message: "No  Staff Member Found .."
            })
        }
        res.json(staff)
    } catch (e) {
        res.status(500).json({
            error: true,
            message: e.message
        })
    }

})

//get Staff Through id
router.get("/staff/:id", async(req, res, next) => {
    try {
        const id = req.params.id;
        const staff = await Staff.find({ _id: id })
        if (staff == '') {
            return res.status(404).json({
                error: true,
                message: "No Staff Found .."
            })
        }
        res.json(staff)
    } catch (e) {
        res.status(500).json({
            error: true,
            message: e.message
        })
    }
})

//remove customer
router.delete("/deleteCustomer/:id", async(req, res, next) => {
    try {
        const customer = await User.deleteOne({ _id: req.params.id })
        res.json(customer)
    } catch (e) {
        next(e)
    }
})


//remove staff member

router.delete("/deleteStaff/:id", async(req, res, next) => {
    try {
        const staff = await Staff.deleteOne({ _id: req.params.id })
        res.json(staff)
    } catch (e) {
        next(e)
    }
})

module.exports = router;