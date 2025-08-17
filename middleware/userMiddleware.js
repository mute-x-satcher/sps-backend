const {userModel} = require('../models/userModel') 
const createUserMiddleware = async (req,res,next) => {
    try {
        
        const {userEmail} = req.body

        const userEmailExist = await userModel.findOne({userEmail: userEmail}) 
        console.log(userEmailExist)
        if(userEmailExist) return res.status(403).json({msg: 'This email is already used'})
        next();    

    } catch (error) {
        console.log(`Middleware-userMiddleware-createUserMiddleware Error: ${error}`)
    }
}


module.exports = {createUserMiddleware}