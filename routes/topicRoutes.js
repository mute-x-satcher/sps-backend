const express = require('express');
const router = express.Router();
const {createTopic,getTopic,updateTopic,deleteTopic} = require('../controllers/topicController')

router.post('/create',createTopic)
router.post('/get',getTopic)
router.put('/update',updateTopic)
router.delete('/delete',deleteTopic)

module.exports = router