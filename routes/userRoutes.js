const express = require('express');
const router = express.Router()
const {createUser,loginUser} = require('../controllers/userController')
const {createUserMiddleware} = require('../middleware/userMiddleware')
router.post('/signup',createUserMiddleware,createUser)
router.post('/login',loginUser)

module.exports = router