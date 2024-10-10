import userModel from "../models/user.model.js";
import validator from "validator"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

//create jwt token
const createToken = async(_id) => {
    return await jwt.sign({_id}, process.env.SECRET_KEY)
    }

// Route for user login
const loginUser = async (req, res) => {
    const {email,password} = req.body

    const user = await userModel.findOne({email})
    
    if(!user){
        return res.status(404).json({message: "User not found"})
    }
    const isMatch = await bcrypt.compare(password,user.password);
    
    if(!isMatch){
        return res.status(400).json({message: "Invalid password"})
        }
    const token = await createToken(user._id)
    
    res.status(200).json({
        message: "User logged in successfully",
        token: token
    })
};

// Route for user register
const registerUser = async (req, res) => {
    try {
        const {name,email,password} = req.body;

    //checking user already exists or not
    const userEmail = await userModel.findOne({email});
    if(userEmail) {
        return res.status(400).json({success:false, message: "Email already exists"});
    };

    // validationg email format & strong password
    if(!validator.isEmail(email)){
        return res.status(400).json({success:false, message: "Please enter a valid email"});
    }

    if(password.length < 8){
        return res.status(400).json({success:false, message: "Please Enter Strong Email"})
    }
    // hashing user password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password,salt);
    // creating new user
    const newUser = new userModel({
        name,
        email,
        password: hashedPassword
    });
    // saving user to database
    const user = await newUser.save();
    // generating token
    const token = await createToken(user._id)
    // sending response
    res.status(200).json({success:true, message: "User created successfully", token})


    } catch (error) {
        console.log(error);
        res.json({
            success: false,
            message: error.message
        })
    }
} 


// Route for admin login
const adminLogin = async (req, res) => {
  res.json({
    message: "Admin created successfully",
  });
};

export { loginUser, registerUser, adminLogin };
