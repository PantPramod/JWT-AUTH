import expressAsyncHandler from "express-async-handler"
import sendMail from "../helper/sendMail.js"
import jwt from 'jsonwebtoken'
import User from "../models/user.js"
import { ForgotPasswordTemplate } from "../helper/EmailTemplate.js"
const forgotPasswordHandler = expressAsyncHandler(async (req, res) => {
    const { email } = req.body

    const userExist = await User.findOne({ email })
    if (!userExist) {
        res.status(400)
        throw new Error("User does not exist")
    }
    const token = jwt.sign({ userId: userExist._id , email:userExist.email}, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '120m' })

    await sendMail(process.env.EMAIL, process.env.PASSWORD, email, token, ForgotPasswordTemplate, "Password Reset Link")
    res.status(200).send({ message: "Password Reset Link sent to your Email" })

})

export default forgotPasswordHandler