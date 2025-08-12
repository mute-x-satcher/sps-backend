const {userModel} = require('../models/userModel') 
const createUserMiddleware = async (req,res,next) => {
    try {
        
        const {userMobile} = req.body

        const userMobileExist = await userModel.findOne({userMobile: userMobile}) 

        if(userMobileExist) return res.status(403).json({msg: 'This mobile number is already in use'})
        next();    

    } catch (error) {
        console.log(`Middleware-userMiddleware-createUserMiddleware Error: ${error}`)
    }
}


module.exports = {createUserMiddleware}