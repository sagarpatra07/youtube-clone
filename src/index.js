// require('dotenv').config({path: '../.env'})

import dotenv from 'dotenv'
import connectDB from './db/connection.js'
import { app } from './app.js'

dotenv.config({
    path: '../.env'
})

connectDB()
//Async method returns a Promise after completion
.then(() => {
    app.on("error", (error) => {
        console.error('MongoDB connection error', error)
    })
    app.listen(process.env.PORT || 8000, () => {
        console.log(`Server is running at port: ${process.env.PORT}`)
    })
})             
.catch((error) => {
    console.log('MongoDB connection failed', error);
})
