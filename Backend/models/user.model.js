import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    surname:{type:String},
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    cartData: { type: Object},
    address: {
      street: { type: String },
      city: { type: String },
      state: { type: String },
      zipcode: { type: Number },
      country: { type: String }
     },
    "dob":{type: Date},
    "phone":{type:Number},
    "role":{type:String,default:"user"},
    "image":{type:String}
  },
  { minimize: false }
);

const userModel = mongoose.models.user || mongoose.model("user", userSchema);

export default userModel;
