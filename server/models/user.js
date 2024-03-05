import mongoose from 'mongoose'
import jwt from 'jsonwebtoken'
import sendEmailVerificationLink from '../helper/sendMail.js'

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, "Email is Required"],
        trim: true,
        unique: true
    },
    password: {
        type: String,
        required: [true, "Password is Required"],
        trim: true
    },
    name: {
        type: String,
        trim: true
    },
    profilePicture: {
        type: String,
        trim: true
    },
    isEmailVerified: {
        type: Boolean,
        default: false

    }
},

    {
        timestamps: {
            createdAt: true,
            updatedAt: true
        }
    }
)



userSchema.post('save', async (doc) => {

    const sender = process.env.EMAIL
    const password = process.env.PASSWORD
    const receiver = doc.email
    const token = jwt.sign({ userId: doc._id , email:doc.email}, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '120m' })

    sendEmailVerificationLink(sender, password, receiver, doc, token)
})

const User = mongoose.model('user', userSchema)

export default User