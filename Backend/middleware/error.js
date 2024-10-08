const ErrorHandler = require("../utils/ErrorHandler");

module.exports = (err,req,res,next)=>{
    err.statusCode = err.statusCode || 500
    err.message = err.message || "Internal Server Error"

    // wrong mongodb id error
    if (err.name===`CastError`) {
        const message = `Resources not found with this id.. Invalid ${err.path}`
        err = new ErrorHandler(message, 404);
    }

    //Duplicate key error
    if (err.code === 11000) {
    const message = `Duplicate key ${Object.keys(err.keyValue)} Entered`;
    }
    // wrong jwt error
    if (err.name === 'JsonWebTokenError') {
        const message = 'Your url token is invalid, Please log in again'
        err = new ErrorHandler(message,400)
    }
    // jwt expired error
    if (err.name === 'TokenExpiredError') {
        const message = 'Your url token has expired, Please log in again'
        err = new ErrorHandler(message,400)
    }
    // Mongoose validation error
    if (err.name === 'ValidationError') {
        const message = err.message;
        err = new ErrorHandler(message,400)
        }
        
    res.status(err.statusCode).json({
        success: false,
        message: err.message
    })
}
