import express from "express";
import {
  loginUser,
  adminLogin,
  registerUser,
  adminSignup,
} from "../controllers/user.controller.js";

const userRouter = express.Router();

userRouter.post("/register", registerUser)
userRouter.post("/admin-signup",adminSignup)
userRouter.post("/login", loginUser)
userRouter.post("/admin-login", adminLogin);

export default userRouter;
