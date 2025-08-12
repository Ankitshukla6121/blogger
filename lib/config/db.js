import mongoose from "mongoose";


export const connectDB= async () =>{
    await mongoose.connect('mongodb+srv://blogger:blogger@cluster0.xiyxihx.mongodb.net/blogger');
    console.log("DB connected")
}