import adminModel from "../models/admin.model.js";
import orderModel from "../models/order.model.js";
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

const vendorStatus = async(req,res,next)=>{
  try {
    const { _id, status } = req.body;
    
    const  vendor = await adminModel.findByIdAndUpdate(_id, { status }, { new: true });
    
    
    if (!vendor) {
      return res.json({success:false,message:"Vendor Not Found"})
      }
    
    const user = await userModel.findById({_id:vendor.userId})

    if (status && user.role  === "user") {
     const status =  await userModel.findByIdAndUpdate(user._id, { role: "vendor" }, { new:true})
    
    }
    else if(!status && user.role  === "vendor") {
      const status =  await userModel.findByIdAndUpdate(user._id, { role: "user" }, {new:true})
      }
      res.json({success:true,message:"Vendor Status Updated Successfully",vendor});
      next();

  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: error.message
      });
  }
}

// Find Vendors own products
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

const getVendorOrders = async (req, res) => {
  try {
    const { userId } = req.body; // or req.query for GET
    console.log("Vendor userId:", userId);
    const vendor = await adminModel.findOne({ _id: userId });
    console.log(vendor.userId);
    
    // Fetch all orders with the correct field (check if it's createdBy or ceratedBy)
    const orders = await orderModel.find({ "items.ceratedBy": vendor.userId });
    
    // Log the orders fetched from the database
    

    if (orders.length === 0) {
      return res.status(404).json({ message: "No orders found for this vendor" });
    }

    res.json({
      success:true, 
      orders });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: error.message
    });
  }
};

// Find Vendors own products
const adminGetVendorProducts = async(req,res)=>{
  try {
    const {userId} =  req.params;
    
    const  products = await productModel.find({ceratedBy:userId});
    
    if (!products) {
      return res.status(404).json({ message: "No products found for this vendor" });
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
const deleteVendor = async (req, res) => {
  try {
    const { _id } = req.body;

    // Find and delete the vendor
    const vendor = await adminModel.findByIdAndDelete(_id);
    
    // If vendor not found, return an error message
    if (!vendor) {
      return res.status(404).json({
        success: false,
        message: "Vendor not found"
      });
    }

    // Find the user associated with the vendor
    const user = await userModel.findById(vendor.userId);

    // If user is not found, log and return an error message
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Associated user not found"
      });
    }

    // Update the user's role back to 'user'
    const update = await userModel.findByIdAndUpdate(
      user._id,
      { role: "user" },
      { new: true }
    );

    // Respond with success
    res.json({
      success: true,
      message: "Vendor deleted successfully",
      vendor,
      user,
      update
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "An error occurred: " + error.message
    });
  }
};



export { getVendorDetails, vendorStatus ,vendorProducts ,getVendorOrders,adminGetVendorProducts,deleteVendor }

