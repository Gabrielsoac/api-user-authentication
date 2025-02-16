import mongoose from "mongoose";

// const user = process.env.USER;
// const password = process.env.PASSWORD;

export const connectDb = async () => {

    try {
        await mongoose.connect('mongodb://localhost:27017/db');
        console.log("connect on db with sucess");
    } 
    catch(err){
        console.log("Connect DB error: ", err);
        process.exit(1);
    }
}