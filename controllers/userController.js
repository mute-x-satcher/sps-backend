const {userModel} = require('../models/userModel')

const createUser = async (req,res) => {
    try {
        
        const {userName,userEmail,userPassword} = req.body
        if(!userName || !userEmail|| !userPassword) 
        {
            res.status(400).json({msg: "Please provide all fields"})
        }

        const userInfo = await userModel.create({
            userName: userName,
            userEmail: userEmail,
            userPassword: userPassword
        }) 

        return res.status(200).json({msg: "User creation successful" , userInfo})

    } catch (error) {
        console.log(`Controllers-userController-createUser Error: ${error}`);
    }
}

const loginUser = async (req,res) => {
    try {
        const {userEmail,userPassword} = req.body
        if(!userEmail || !userPassword) return res.status(400).json({msg: 'Please provide all fields'})
        const userInfo = await userModel.findOne({userEmail: userEmail,userPassword: userPassword})
        console.log(userInfo)
        if(!userInfo) return  res.status(401).json({msg: 'Invalid email or password'})
       
        return res.status(200).json({msg: `Login successful ${userInfo.userName}` , userInfo})   

    } catch (error) {
        console.log(`Controllers-userController-loginUser Error: ${error}`)
    }
}

module.exports = {createUser,loginUser};