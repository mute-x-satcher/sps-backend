const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
        userName: {
            type: String,
            required: true,
        },
        userMobile:{
            type: String,
            required: true
        },
        userOTP:{
            type: String,
        },
        userPassword:{
            type: String,
            required: true,
        }
    })


const userModel = mongoose.model('users',userSchema)

module.exports = {userModel}