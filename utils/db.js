import mongoose from "mongoose";

const connectDB = async(req,res)=>{
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log("DB is connected")
    } catch (error) {
        console.log(error);
        process.exit(0)
    }
}

export default connectDB;