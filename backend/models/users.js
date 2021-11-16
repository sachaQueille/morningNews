const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    userName: String,
    mail: String,
    pwd: String,
})

let userModel = mongoose.model('users', userSchema)

module.exports = userModel