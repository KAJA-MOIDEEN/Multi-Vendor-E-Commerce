import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./config/mongodb.js";

// app config
const app = express();

const port = process.env.PORT || 4000 
 
// middelwares
app.use(express.json());
app.use(cors());

//api endpoints
app.get('/',(req,res)=>{
    res.send('<h1>API WORKING</h1>')
});


app.listen(port,()=>console.log(`Server Successfully Started on http://localhost:${port}`));
connectDB()