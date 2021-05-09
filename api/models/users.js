const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        min: 7,
        required: true,
        unique: true,
        match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
    },
    password: {
        type: String,
        min: 8,
        required: true,
    },
    phone: {
        type: String,
        min: 10,
        default: 'Not Set'
            // unique: true,
            //  match: /^(?:0|94|\+94)?(?:(11|21|23|24|25|26|27|31|32|33|34|35|36|37|38|41|45|47|51|52|54|55|57|63|65|66|67|81|912)(0|2|3|4|5|7|9)|7(0|1|2|5|6|7|8)\d)\d{6}$/
    },
    nic: {
        type: String,
        min: 10,
        max: 12
    },
    Usertype: {
        type: String,
        required: true,
        default: 'user'

    },
    country: {
        type: String,
        min: 2,
        default: 'Not Set'
    },



});

module.exports = mongoose.model('User', userSchema)