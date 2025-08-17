const express = require('express');
const router = express.Router()

const {getDashTask,markDashTask} = require('../controllers/dashboardController')

router.post('/get',getDashTask)
router.put('/mark',markDashTask)

module.exports = router