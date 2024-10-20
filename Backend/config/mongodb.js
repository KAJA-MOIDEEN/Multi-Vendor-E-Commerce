import mongoose from "mongoose";

const connectDB = async()=>{
    try {

        await mongoose.connect(process.env.MONGO_URL)
        mongoose.connection.on('connected',()=>{
            console.log('MongoDB connected');
        })
    } catch (error) {
        console.log("MongoDB Connection Error: ",error);
        
    }
       
}

export default connectDB;