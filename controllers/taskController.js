const {getTodayObject,generateDatesFromObj} = require('../date_and_time/dateTime')
const {taskModel} = require('../models/taskModel')
const createTask = async (req,res) => {
    try {
        const {taskName,taskType,taskDescription,topicId,subjectId} = req.body
        if(!taskName || !taskType || !topicId || !subjectId) return res.status(400).json({msg: 'Please provide all fields'})
        
        const todayObj = getTodayObject()
        const dueDates = generateDatesFromObj(todayObj)    
        
        console.log(todayObj)
        console.log(dueDates)        

        const dueDateArray = []

        dueDates.map((dueDate) => {
            dueDateArray.push({dueDate: dueDate , isCompleted: false})
        })
        
        const taskInfo = await taskModel.create({
            taskName: taskName,
            taskType: taskType,
            topicId: topicId,
            subjectId: subjectId,
            taskDescription: taskDescription,
            taskDueDates: dueDateArray,
            createdAt: todayObj.dateString
        }) 
        
        return res.status(200).json({msg: 'Task creation successful' , taskInfo})

    } catch (error) {
        console.log(`Controllers-taskController-createTask Error: ${error}`);
    }
}

const getTask = async (req,res) => {
    try {
        const {topicId} = req.body
        if(!topicId)  return res.status(400).json({msg: 'Please provide all fields'})
        const allTaskInfo = await taskModel.find({topicId: topicId})
        if(!allTaskInfo)  return res.status(400).json({msg: 'Tasks not found'})
        return res.status(200).json({msg: 'Task fetch successful' , allTaskInfo},)
        
    } catch (error) {
        console.log(`Controllers-taskController-getTask Error: ${error}`);
    }
}


const updateTask = async (req,res) => {
    try {
        const {taskName,taskId} = req.body
        if(!taskName || !taskId ) return res.status(400).json({msg: 'Please provide all fields'})

        const updatdedTaskInfo = await taskModel.updateOne({_id: taskId},{$set: {taskName: taskName}})
        if(updatdedTaskInfo.updatedCount == 0) return res.status(400).json({msg: 'Task update faild'})
        return res.status(200).json({msg: 'Task updated successfully ',updatdedTaskInfo})

    } catch (error) {
        console.log(`Controllers-taskController-updateTask Error: ${error}`);
    }
}

const deleteTask = async (req,res) => {
    try {
        const {taskId} = req.body
        if(!taskId) return res.status(400).json({msg: 'Please provide all fields'})

        const deletedTaskInfo = await taskModel.deleteOne({_id: taskId})
        if(deletedTaskInfo.deletedCount == 0) return res.status(400).json({msg: 'Task delete operation was faild'})
        return res.status(200).json({msg: 'Task successfully deleted'})
    } catch (error) {
        console.log(`Controllers-taskController-deleteTask Error: ${error}`);
    }
}
module.exports = {createTask,getTask,updateTask,deleteTask}