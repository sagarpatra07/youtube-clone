// require('dotenv').config({path: '../.env'})

import dotenv from 'dotenv'
import connectDB from './db/connection.js'

dotenv.config({
    path: '../.env'
})

connectDB()














// CONNECTING TO DATABASE USING IIFEs
/*
import express from 'express'
const app = express()

( async () => {
    try{
        await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
        app.on("error", (error) => {
            console.error('MongoDB connection error:', error);
        });


        app.listen(process.env.PORT || 8000, () => {
            console.log(`Server is running on port ${process.env.PORT || 8000}`);
        })
    }

    
    catch (error) {
        console.error('Error connecting to MongoDB:', error);
    }
})()
*/