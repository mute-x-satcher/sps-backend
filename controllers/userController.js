const {userModel} = require('../models/userModel')

const createUser = async (req,res) => {
    try {
        
        const {userName,userMobile,userPassword} = req.body
        if(!userName || !userMobile || !userPassword) 
        {
            res.status(400).json({msg: "Please provide all fields"})
        }

        const userInfo = await userModel.create({
            userName: userName,
            userMobile: userMobile,
            userPassword: userPassword
        }) 

        return res.status(200).json({msg: "User creation successful" , userInfo})

    } catch (error) {
        console.log(`Controllers-userController-createUser Error: ${error}`);
    }
}

const loginUser = async (req,res) => {
    try {
        const {userMobile,userPassword} = req.body
        if(!userMobile || !userPassword) return res.status(400).json({msg: 'Please provide all fields'})
        const userInfo = await userModel.findOne({userMobile: userMobile,userPassword: userPassword})
        console.log(userInfo)
        if(!userInfo) return  res.status(401).json({msg: 'Invalid mobile or password'})
       
        return res.status(200).json({msg: `Login successful ${userInfo.userName}` , userInfo})   

    } catch (error) {
        console.log(`Controllers-userController-loginUser Error: ${error}`)
    }
}

module.exports = {createUser,loginUser};