const express = require('express');
const router = express.Router();
const {createSubject,getSubject,updateSubject,deleteSubject} = require('../controllers/subjectController')

router.post('/create',createSubject)
router.post('/get',getSubject)
router.put('/update',updateSubject)
router.delete('/delete',deleteSubject)

module.exports = router