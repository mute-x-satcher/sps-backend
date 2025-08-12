const express = require('express');
const router = express.Router()

const {getDashTask} = require('../controllers/dashboardController')

router.get('/get',getDashTask)

module.exports = router