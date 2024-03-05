import express from 'express'
import signup from '../controllers/signup.js'
import getAllPosts from '../controllers/getAllPosts.js'
import validator from '../middlewares/validator.js'
import { loginSchema, signUpSchema } from '../helper/inputSchema.js'
import validateToken from '../middlewares/validateToken.js'
import verifyEmail from '../controllers/verifyEmail.js'
import loginHandler from '../controllers/loginHandler.js'
import refresh from '../controllers/refresh.js'

const router = express.Router()

router.post("/login", validator(loginSchema), loginHandler)

router.post("/signup", validator(signUpSchema), signup)

router.post("/verify", verifyEmail)

router.get("/posts", validateToken, getAllPosts)

router.get("/refresh", refresh)

export default router