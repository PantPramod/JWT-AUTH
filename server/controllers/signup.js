import expressAsyncHandler from 'express-async-handler'
import User from '../models/user.js';
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const signup = expressAsyncHandler(async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email })

    if (user) {
        res.status(400)
        throw new Error('User already exists')
    }

    const salt = await bcrypt.genSalt(10)

    const hashedPassword = await bcrypt.hash(password, salt)

    await User.create({ ...req.body, password: hashedPassword })

    res.status(201).send({ message:"User Registered Successfully. Check your email to verify Email Id" })

})

export default signup