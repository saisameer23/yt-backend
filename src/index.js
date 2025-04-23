import mongoose from "mongoose";
import express from "express";
import { DB_NAME } from "./constants.js";
import dotenv from "dotenv";
dotenv.config();
 const app = express();

 ( async ()=>{
    try{
        await mongoose.connect(`${process.env.MONGODB_URL}/${DB_NAME}`);
        app.on("error", (err) => {
            console.error("Error starting server:", err);
        });
        app.listen(process.env.PORT,()=>{
            console.log(`server is listening on port ${process.env.PORT}`);
        })
    }
    catch(err){
        console.log("Error connecting to MongoDB", err);
        throw err;
    }
 })();