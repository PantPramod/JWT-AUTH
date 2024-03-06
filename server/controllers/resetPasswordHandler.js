import expressAsyncHandler from "express-async-handler"
import User from "../models/user.js"
import bcrypt from 'bcrypt'
const resetPasswordHandler = expressAsyncHandler(async (req, res) => {
    const { password } = req.body
    const salt = await bcrypt.genSalt(10)

    const hashedPassword = await bcrypt.hash(password, salt)

    await User.findOneAndUpdate({ email: req.user.email }, { password:hashedPassword }, { new: true })
    res.status(200).send({ message: "Password Updated Successfully" })
})

export default resetPasswordHandler