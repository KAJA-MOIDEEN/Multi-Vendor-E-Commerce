const mongoose = require("mongoose");
const {v4} = require("uuid");


const userSchema = new mongoose.Schema({
    _id: {
        type:String,
        default: v4()
    },
    name:{
        type:String,

    },
    email:{
        type:String,

   },
   password:{
    type:String,
   },
   address:[
    {
        country:{
            type:String,
        },
        city:{
            type:String,
        },
        address1:{
            type:String,
        },
        address2:{
            type:String,
        },
        zipcode:{
            type:Number,
        },
        addressType:{
            type:String,
        },
    }

   ],
   phoneNumber:{
    type:Number,
   },
   role:{
    type:String,
    default:"user",
   },
   avatar:{
    public_id:{
        type:String,
        required: true,
    },
    url:{
        type:String,
        required: true,
    },

   },
   resetPasswordToken:String,
   resetPasswordTime:Date,


},
{timestamps:true}
);

const userLogin = mongoose.Model("User", userSchema);

Module.exports =  userLogin;