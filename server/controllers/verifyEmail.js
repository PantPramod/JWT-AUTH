import expressAsyncHandler from "express-async-handler"
import jwt from "jsonwebtoken"
import User from "../models/user.js"

const verifyEmail = expressAsyncHandler(async (req, res) => {

   const {token} = req.body
   const response =jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
  
   const refreshToken = jwt.sign({userId:response.userId, email:response.email},process.env.REFRESH_TOKEN_SECRET,  { expiresIn: '3d' })
   
   await User.findOneAndUpdate({email:response.email},{isEmailVerified:true}, {returnOriginal: false})
   
   res.send({token, message:"Email Id Verified Successfully", refreshToken})

})

export default verifyEmail