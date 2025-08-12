const {subjectModel} = require('../models/subjectModel')
const createSubject = async (req,res) => {
    try {
        const {subjectName,accountId} = req.body
        if(!subjectName || !accountId) return res.status(400).json({msg: 'Please provide all fields'});

        const subjectInfo = await subjectModel.create({
            subjectName: subjectName,
            accountId: accountId,
        })

        return res.status(200).json({msg: 'Subject successfully' ,subjectInfo})

    } catch (error) {
        console.log(`Controllers-subjectController-createSubject Error: ${error}`);
    }
}

const getSubject = async(req,res) => {
    try {
        const {accountId} = req.body
        if(!accountId) return res.status(400).json({msg: 'Please provide all fields'});

        const allSubjectsInfo = await subjectModel.find({accountId: accountId})
        if(!allSubjectsInfo) return res.status(404).json({msg: 'Subjects not found'})
        return res.status(200).json({msg: 'Subject fetch successful', allSubjectsInfo})

    } catch (error) {
        console.log(`Controllers-subjectController-getSubject Error: ${error}`);
    }
}

const updateSubject = async (req,res) => {
    try {
        const {subjectName,subjectId} = req.body
        if(!subjectName || !subjectId) return res.status(400).json({msg: 'Please provide all fields'});

        const updatedSubjectInfo = await subjectModel.updateOne(
            {_id: subjectId},
            {$set: {subjectName: subjectName}
        })

        if(updatedSubjectInfo.matchedCount == 0) return res.status(404).json({msg: 'Subjects not found'})
        return res.status(200).json({msg: 'Subject update successful' , updatedSubjectInfo})

    } catch (error) {
        console.log(`Controllers-subjectController-updateSubject Error: ${error}`);
    }
}

const deleteSubject = async (req,res) => {
    try {
        const {subjectId} = req.body
        if(!subjectId) return res.status(400).json({msg: 'Please provide all fields'});
        const deletedSubject = await subjectModel.deleteOne({_id: subjectId})
        if(deletedSubject.deletedCount == 0) return res.status(404).json({msg: 'Subject delete operation was faild'})
        return res.status(200).json({msg: 'Subject successfully deleted' , deletedSubject})
    } catch (error) {
        console.log(`Controllers-subjectController-deleteSubject Error: ${error}`);
    }
}

module.exports = {createSubject,getSubject,updateSubject,deleteSubject}