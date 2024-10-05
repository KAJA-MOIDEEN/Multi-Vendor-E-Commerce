const express = require("express"); 
const ErrorHandler = require("./utils/ErrorHandler");
const app = express(); 
const cookieParser = require("cookie-parser")
const bodyParser = require("body-parser")
const fileupload = require("express-fileupload")


app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended:true}));
app.use(fileupload({useTempFiles:true}));


// config 
if (process.env.NODE_ENV !== 'PRODUCTION') { 
    require("dotenv").config({
        path: "config/.env" 
    }); 
} 

// its for ErrorHandling
app.use(ErrorHandler);
module.exports = app;
