const {topicModel} = require('../models/topicModel')
const createTopic = async (req,res) => {
    try {
        const {topicName,subjectId} = req.body
        if(!topicName || !subjectId) return res.status(400).json({msg: 'Please provide all fields'});

        const topicInfo = await topicModel.create({
            topicName: topicName,
            subjectId: subjectId,
        })

        return res.status(200).json({msg: 'Topic successfully' ,topicInfo})

    } catch (error) {
        console.log(`Controllers-topicController-createTopic Error: ${error}`);
    }
}

const getTopic = async(req,res) => {
    try {
        const {subjectId} = req.body
        if(!subjectId) return res.status(400).json({msg: 'Please provide all fields'});

        const allTopicInfo = await topicModel.find({subjectId: subjectId})
        if(!allTopicInfo) return res.status(404).json({msg: 'Topics not found'})
        return res.status(200).json({msg: 'Topic fetch successful', allTopicInfo})

    } catch (error) {
      console.log(`Controllers-topicController-getTopic Error: ${error}`);
    }
}

const updateTopic = async (req,res) => {
    try {
        const {topicName,topicId} = req.body
        if(!topicName || !topicId) return res.status(400).json({msg: 'Please provide all fields'});

        const updatedTopicInfo = await topicModel.updateOne(
            {_id: topicId},
            {$set: {topicName: topicName}
        })

        if(updatedTopicInfo.matchedCount == 0) return res.status(404).json({msg: 'Topic not found'})
        return res.status(200).json({msg: 'Topic Name update successful' , updatedTopicInfo})

    } catch (error) {
       console.log(`Controllers-topicController-updateTopic Error: ${error}`);
    }
}

const deleteTopic = async (req,res) => {
    try {
        const {topicId} = req.body
        if(!topicId) return res.status(400).json({msg: 'Please provide all fields'});
        const deletedTopic = await topicModel.deleteOne({_id: topicId})
        if(deletedTopic.deletedCount == 0) return res.status(404).json({msg: 'Subject delete operation was faild'})
        return res.status(200).json({msg: 'Subject successfully deleted' , deletedTopic})
    } catch (error) {
        console.log(`Controllers-topicController-deleteTopic Error: ${error}`);
    }
}

module.exports = {createTopic,getTopic,updateTopic,deleteTopic}