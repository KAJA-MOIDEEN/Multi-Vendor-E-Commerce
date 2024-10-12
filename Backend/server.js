import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./config/mongodb.js";
import connectcloudinary from "./config/cloudinary.js";
import userRouter from "./routes/user.route.js";
import productRouter from "./routes/product.route.js";
import cartRouter from "./routes/cart.route.js";

// app config
const app = express();
const port = process.env.PORT || 4000 
connectDB();
connectcloudinary()

 
// middelwares
app.use(express.json());
app.use(cors());

//api endpoints
app.use("/api/user", userRouter);
app.use("/api/product",productRouter);
app.use('/api/cart',cartRouter)

app.get('/',(req,res)=>{
    res.send('<h1>API WORKING</h1>')
});


app.listen(port,()=>console.log(`Server Successfully Started on http://localhost:${port}`));
connectDB()