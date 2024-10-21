import express from "express";
import upload from "../middleware/multer.js";
import adminAuth from "../middleware/adminAuth.js";
import {
  loginUser,
  registerUser,
  userUpdate,
  getUserDetails,
} from "../controllers/user.controller.js";
import authUser from "../middleware/auth.js";
import { getVendorDetails, vendorStatus } from "../controllers/vendor.controller.js";
import { adminLogin, adminSignup } from "../controllers/admin.controller.js";

const userRouter = express.Router();

//Login and SignUp for user
userRouter.post("/register", registerUser)
userRouter.post("/login", loginUser)
userRouter.get('/user-profile',authUser,getUserDetails)
userRouter.put("/user-update",upload.single("profileImage"),authUser,userUpdate)

//Login and SignUp for Adimn and Vendors
userRouter.post("/seller-register",authUser,adminSignup)
userRouter.post("/admin-login", adminLogin);

//vendor  details
userRouter.get("/vendor-details",adminAuth,getVendorDetails)
userRouter.post('/vendor-status',adminAuth,vendorStatus)



export default userRouter;
