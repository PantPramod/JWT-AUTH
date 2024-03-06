import express from 'express'
import cors from 'cors'
import errorHandler from './middlewares/errorHandler.js'
import allRoutes from './routes/index.js'
import dotenv from 'dotenv'
import connectDB from './helper/connectDB.js'
import insertDummyPosts from './helper/insertDummyPosts.js'
import { rateLimit } from 'express-rate-limit'


dotenv.config()


const app = express()
const PORT = process.env.PORT || 8000
const DB_URL = process.env.DB_URL

app.use(cors())
app.use(express.json())


const limiter = rateLimit({
	windowMs: 5 * 60 * 1000, 
	limit: 200, 
	message:"Rate limit exceeds"
})

app.use(limiter)

app.use('/', allRoutes)

app.use(errorHandler)

app.listen(PORT, () => {
    console.log(`App listening on PORT : ${PORT}`)
    connectDB(DB_URL)
    insertDummyPosts() 
})

