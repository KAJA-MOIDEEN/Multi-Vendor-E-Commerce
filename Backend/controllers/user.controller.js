import userModel from "../models/user.model.js";
import adminModel from "../models/admin.model.js"
import validator from "validator"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

//create jwt token
const createToken = async(_id) => {
    return await jwt.sign({_id}, process.env.JWT_SECRET)
    }

// Route for user login
const loginUser = async (req, res) => {
    const {email,password} = req.body;

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
        success: true,
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
        console.log(error.message);
        res.json({
            success: false,
            message: error.message
        })
    }
} 

const userUpdate = async (req, res) =>{
    const {userId} = req.body
    // , name, surname, email, address

    const user = await userModel.findById(userId)
    console.log(user);
    res.json({
        data:user
    })
    
    
}

// Route for user signUp
const adminSignup = async (req,res)=>{
    try {
        const {email,password} = req.body;
        console.log(req.body);
        
        // checking user already exists or not
        const userEmail = await adminModel.findOne({email});
        if (userEmail) {
           return res.json({message:"Email already exists",success:false})
        }
        // validationg email format & strong password
        if(!validator.isEmail(email)){
            return res.json({success:false, message: "Please enter a valid email"})
        }
        if(password.length < 8){
            console.log("Please Enter Strong Email");
            return res.json({success:false, message: "Please Enter Strong password"})
            }
            // hashing user password
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password,salt);
            // creating new admin or vendor
            const newAdmin = new adminModel({
                ...req.body,
                password: hashedPassword,
            })
            // saving admin to database
            const admin = await newAdmin.save();
            // generating token
            const token = await createToken(admin._id)
            // sending response
            res.status(200).json({success:true, message: "Admin created successfully"})
        
    } catch (error) {
        console.log(error);
        res.json({
            success:false,
            message:error.message
        })
        
    }
}

// Route for admin login
const adminLogin = async (req, res) => {
  try {
    const {email,password} = req.body
    const admin = await adminModel.findOne({email});
    if (!admin) {
        return res.json({success:false,message:"Invalid Email or Password"})
        }
        // comparing password
        const isMatch = await bcrypt.compare(password, admin.password);
        if (!isMatch) {
            return res.json({success:false,message:"Invalid Email or Password"})
            }

            // generating token
            const token = await createToken(admin._id)
            // sending response
            res.status(200).json({success:true,message:"logged in successfully",token})

    
  } catch (error) {
    console.log(error);
        res.json({
            success: false,
            message: error.message
        })
    
  }
};

export { loginUser, registerUser, adminLogin , adminSignup, userUpdate};
