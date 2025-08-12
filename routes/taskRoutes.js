const express = require('express');
const router = express.Router();
const {createTask,getTask,updateTask,deleteTask} = require('../controllers/taskController')

router.post('/create',createTask)
router.post('/get',getTask)
router.put('/update',updateTask)
router.delete('/delete',deleteTask)

module.exports = router