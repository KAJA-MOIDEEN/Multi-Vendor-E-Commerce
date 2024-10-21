import adminModel from "../models/admin.model.js";
import productModel from "../models/product.model.js";
import userModel from "../models/user.model.js";

const getVendorDetails = async (req,res) =>{
  try {
    const { userId } = req.body;
    
    const admin = await adminModel.findById(userId)
    
    if (admin.role !== "Admin" && admin) {
      return res.json({success:false,message:"Unauthorised Access"})
    }
    const vendor = await adminModel.find({role:"Vendor"})
    
    if (!vendor) {
      return res.json({success:false,message:"No Vendors found"})
      }

      const vendorDetails = vendor.map((vendor) => {
        return {
        _id: vendor._id,
        name: vendor.name,
        surname:vendor.surname,
        email:vendor.email,
        phone:vendor.phone,
        address:vendor.address,
        userId:vendor.userId,
        company:vendor.company,
        role:vendor.role,
        image:vendor.image,
        dob:vendor.dob,
        status:vendor.status,
        pan:vendor.pan,
        aadhaar:vendor.aadhaar,
        GST:vendor.GST
          }
        });

        res.json({success:true,message:"Vendor Details Fetched Successfully",vendorDetails});

  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: error.message
      });
  }
}

const vendorStatus = async(req,res)=>{
  try {
    const { _id, status } = req.body;
    const  vendor = await adminModel.findByIdAndUpdate(_id, { status }, { new: true });
    if (!vendor) {
      return res.json({success:false,message:"Vendor Not Found"})
      }
      
      res.json({success:true,message:"Vendor Status Updated Successfully",vendor});
    

  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: error.message
      });
  }
}

const vendorProducts = async(req,res)=>{
  try {
    const {userId} =  req.body;

    const vendor = await adminModel.findOne({_id:userId})
    
    const products = await productModel.find({ceratedBy:vendor.userId})
    
    if (!products) {
      return res.json({success:false,message:"No Products Found"})
      }
      res.json({
        success:true,
        message:"Products Fetched Successfully",
        products
      })

  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: error.message
      });
  }
}

export { getVendorDetails, vendorStatus ,vendorProducts }

