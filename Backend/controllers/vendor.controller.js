import adminModel from "../models/admin.model.js";

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
        id: vendor._id,
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

const vendorStatus = (req,res)=>{
  try {
    const { userId, status } = req.body;
    console.log(userId,status);

  } catch (error) {
    
  }
}


export { getVendorDetails, vendorStatus }

