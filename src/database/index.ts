import mongoose from "mongoose";

const user = process.env.USER_DB;
const password = process.env.PASSWORD_DB;

export const connectDb = async () => {

    try {
        await mongoose.connect(`mongodb://${user}:${password}@localhost:27017/db?authSource=admin`);
        console.log("connect on db with sucess");
    }
    catch(err){
        console.log("Connect DB error: ", err);
        process.exit(1);
    }
}