import mongoose from 'mongoose'

const connectDB = (url) => {
    try {
        mongoose.connect(url)

        mongoose.connection.on("connected", () => {
            console.log("Connected with mongodb")
        })

        mongoose.connection.on("error", () => {
            console.log('Error connecting to the database')
        })
    } catch (err) {
        console.log("Error on Database connection", err)
    }
}

export default connectDB