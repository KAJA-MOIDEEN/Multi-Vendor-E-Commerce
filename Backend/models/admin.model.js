import mongoose from "mongoose";

const adminSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, required: true, enum:["Admin","Vendor"], default:"Vendor" },
    address:{type:String,required:true},
    phone:{type:String,required:true},
    company:{type:String,required:true},
    image:{type:String},
    status:{type:Boolean, required:true,default:false},
    pan:{type:String,required:true},
    aadhaar:{type:String,required:true},
    GST:{type:String,required:true}
  },
  { minimize: false }
);

const adminModel = mongoose.models.admin || mongoose.model("admin", adminSchema);

export default adminModel ;