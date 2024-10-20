import mongoose from "mongoose";

const adminSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    name: { type: String, required: true },
    surname:{type:String, required:true},
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { 
      type: String, 
      required: true, 
      enum: ["Admin", "Vendor"], 
      default: "Vendor" 
    },
    address: { type: String, required: true },
    phone: { type: String, required: true },
    company: {
      type: String,
      required: function () {
        return this.role === "Vendor"; // Only required for Vendors
      },
    },
    image: { type: String },
    status: { type: Boolean, required: true, default: false },
    pan: {
      type: String,
      required: function () {
        return this.role === "Vendor"; // Only required for Vendors
      },
    },
    aadhaar: {
      type: String,
      required: function () {
        return this.role === "Vendor"; // Only required for Vendors
      },
    },
    GST: {
      type: String,
      required: function () {
        return this.role === "Vendor"; // Only required for Vendors
      },
    },
    dob:{type:Date}
  },
  { minimize: false }
);

const adminModel = mongoose.models.admin || mongoose.model("admin", adminSchema);

export default adminModel;
