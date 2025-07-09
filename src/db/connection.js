import mongoose from 'mongoose'
import { DB_NAME } from '../constants.js'

const connectDB = async () => {
    try{
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
        console.log(`MongoDB connected: ${connectionInstance.connection.host}`);
    }
    catch(error){
        console.erroe('Error  connecting to MongoDB:', error);
        process.exit(1) // Exit the process with failure
    }
}

export default connectDB