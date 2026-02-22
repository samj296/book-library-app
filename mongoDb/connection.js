require("dotenv");
const mongoose = require("mongoose");
const URI = process.env.MONGODB_URI;

module.exports = async function connectionDB(){
    try{
        await mongoose.connect(URI);
        console.log("Connected to MongoDB");
    }catch(err){
        console.error("Failed to connect Database:", err.message);
        process.exit(1); //stop the app if connection failed
    };
};