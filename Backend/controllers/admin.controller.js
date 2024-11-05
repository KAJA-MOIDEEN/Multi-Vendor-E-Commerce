import adminModel from "../models/admin.model.js";
import  bcrypt from "bcrypt";
import userModel from "../models/user.model.js";
import { createToken } from "./user.controller.js";
import { sendMailForRegistration } from "../middleware/mailSend.js";

// Route for user signUp
const adminSignup = async (req,res)=>{
    console.log(req.body); // Log the entire body
      try {
        
         const { userId, company, pan, aadhar, GST,} = req.body;
          
          // checking user already exists or not
          const user = await userModel.findById(userId);
  
          if (!user) {
             return res.json({message:"Please Loging Agin",success:false})
          }
  
          const userEmail = await adminModel.findOne({email : user.email})
          
          if (userEmail){
            return res.json({
              success: false,
              message: "Vendor Already Exist",
              waiting_MSG:"Please Wait For Admin Verification",
            })
            
          }
  
          const data  = {
            userId : userId,
            name : user.name,
            surname : user.surname,
            email : user.email,
            password:  user.password,
            phone : user.phone,
            dob : user.dob,
            address : user.address,
            image : user.image,
            company:company,
            pan:pan,
            aadhaar:aadhar,
            GST:GST
            }
            
            const admindata = await  adminModel.create(data);
            console.log(admindata);
          
            res.json({message:"Admin created successfully", success:true })
            sendMailForRegistration(admindata)
            
  
      } catch (error) {
          console.log(error);
          res.json({
              success:false,
              message:error.message
          })
          
      }
  };

  // Route for admin login
const adminLogin = async (req, res) => {
    try {
      const {email,password} = req.body
      const admin = await adminModel.findOne({email});
      if (!admin) {
          return res.json({success:false,message:"Invalid Email or Password"})
          }
          if (!admin.status){
            return res.json({
              success:false,
              message:"Your Account is not verified by Admin",
            })
          }
          
          // comparing password
          const isMatch = await bcrypt.compare(password, admin.password);
          if (!isMatch) {
              return res.json({success:false,message:"Invalid Email or Password"})
              }
  
              // generating token
              const token = await createToken(admin._id)
  
              if (admin.role === "Admin") {
                const user = {
                  token:token,
                  role:admin.role
                }
               return res.json({success:true,message:"Admin logged in successfully",user})
              }
              if (admin.role === "Vendor") {
                const user = {
                  token:token,
                  role:admin.role
                }
                 // sending response for Vendor
              res.status(200).json({success:true,message:"Vendor logged in successfully",user})
  
              }
             
      
    } catch (error) {
      console.log(error);
          res.json({
              success: false,
              message: error.message
          })
      
    }
  };

  export {adminSignup, adminLogin}