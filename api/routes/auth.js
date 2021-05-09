const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/users.js');
const Staff = require('../models/staff.model');
const Admin = require('../models/admin.model');

//customer signup route 
router.post('/signup', (req, res, next) => {
    User.find({ email: req.body.email })
        .exec()
        .then(user => { //check if the email is allready taken
            if (user.length >= 1) {
                return res.status(409).json({
                    message: 'Email Already Taken. '
                });
            } else {
                bcrypt.hash(req.body.password, 10, (err, hash) => { //hash the password using bcrypt
                    if (err) {
                        return res.status(500).json({
                            error: err
                        });
                    } else {
                        const user = new User({
                            _id: new mongoose.Types.ObjectId(),
                            name: req.body.name,
                            email: req.body.email,
                            phone: req.body.phone,
                            country: req.body.country,
                            password: hash,
                            Usertype: req.body.Usertype
                        });
                        user.save()
                            .then(result => {
                                console.log(result);
                                res.status(201).json({
                                    message: "Sign up Sucessfully",
                                    createdUser: result
                                });

                            })
                            .catch(err => {
                                console.log(err);
                                res.status(500).json({
                                    error: err
                                });
                            })
                    }
                })

            }
        })
});

//login customers
router.post('/customerLogin', async(req, res) => {
    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(400).send({ message: 'Email does Not Exist' });

    const validPass = await bcrypt.compare(req.body.password, user.password);

    if (!validPass) return res.status(400).send({ message: 'Password is Wrong' });

    const token = jwt.sign({ _id: user._id }, '7yhGG45#rrtCvhh@swqaFrc');


    res.header('auth-token', token).send({
        id: user.id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        country: user.country,
        nic: user.nic,
        token: token,
        usertype: user.usertype,
        message: user.name,
    });
});

//add new/SIGNUP staff member
router.post('/addStaff', (req, res, next) => {
    Staff.find({ email: req.body.email })
        .exec()
        .then(staff => { //check if the email is allready taken
            if (staff.length >= 1) {
                return res.status(409).json({
                    message: 'Email Already Taken. '
                });
            } else {
                bcrypt.hash(req.body.password, 10, (err, hash) => { //hash the password using bcrypt
                    if (err) {
                        return res.status(500).json({
                            error: err
                        });
                    } else {
                        const staff = new Staff({
                            _id: new mongoose.Types.ObjectId(), //create id in mongodb 
                            name: req.body.name, //data get from body
                            email: req.body.email,
                            password: hash,
                            epfNumber: req.body.epfNumber,
                            Usertype: req.body.Usertype,
                            nic: req.body.nic,
                            designation: req.body.designation,
                            status: req.body.status
                        });
                        staff.save()
                            .then(result => {
                                console.log(result);
                                res.status(201).json({
                                    message: "Add New Staff Member Successfully!!",
                                    createdStaff: result
                                });

                            })
                            .catch(err => {
                                console.log(err);
                                res.status(500).json({
                                    error: err
                                });
                            })
                    }
                })

            }
        })
});

//login staff
router.post('/staffLogin', async(req, res) => {
    const staff = await Staff.findOne({ email: req.body.email });
    if (!staff) return res.status(400).send({ message: 'Email does Not Exist' });

    const validPass = await bcrypt.compare(req.body.password, staff.password);

    if (!validPass) return res.status(400).send({ message: 'Password is Wrong' });

    const token = jwt.sign({ _id: staff._id }, '7yhGG45#rrtCvhh@swqaFrc');


    res.header('auth-token', token).send({
        id: staff.id,
        name: staff.name,
        email: staff.email,
        epfNumber: staff.epfNumber,
        designation: staff.designation,
        nic: staff.nic,
        status: staff.status,
        token: token,
        usertype: staff.usertype,
        message: staff.name,
    });
});



//login admin
router.post('/adminLogin', async(req, res) => {
    const admin = await Admin.findOne({ email: req.body.email });
    if (!admin) return res.status(400).send({ message: 'Email does Not Exist' });

    const validPass = await bcrypt.compare(req.body.password, admin.password);

    if (!validPass) return res.status(400).send({ message: 'Password is Wrong' });

    const token = jwt.sign({ _id: admin._id }, '7yhGG45#rrtCvhh@swqaFrc');


    res.header('auth-token', token).send({
        id: admin.id,
        email: admin.email,
        token: token,
        usertype: admin.type
    });
});


// add admin
router.post('/addAdmin', (req, res, next) => {
    Admin.find({ email: req.body.email })
        .exec()
        .then(admin => { //check if the email is allready taken
            if (admin.length >= 1) {
                return res.status(409).json({
                    message: 'Email Already Taken. '
                });
            } else {
                bcrypt.hash("12345678", 10, (err, hash) => { //hash the password using bcrypt
                    if (err) {
                        return res.status(500).json({
                            error: err
                        });
                    } else {
                        const admin = new Admin({
                            _id: new mongoose.Types.ObjectId(), //create id in mongodb 
                            email: "admin@admin.com",
                            password: hash,
                            type: req.body.type,
                        });
                        admin.save()
                            .then(result => {
                                console.log(result);
                                res.status(201).json({
                                    message: "Admin Added Successfully!!",
                                    createdAdmin: result
                                });

                            })
                            .catch(err => {
                                console.log(err);
                                res.status(500).json({
                                    error: err
                                });
                            })
                    }
                })

            }
        })
});


module.exports = router;