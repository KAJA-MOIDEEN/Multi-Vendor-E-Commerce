import orderModel from "../models/order.model.js";
import userModel from "../models/user.model.js";

//Placing order 
const placeOrder = async (req, res) => {
    try {
      const { userId, items, amount, address } = req.body;
      // console.log(userId, items, amount, address);
  
      const orderData = {
        userId,
        items,
        amount,
        address,
        paymentMethod: 'COD',
        payment: false,
        date: Date.now(),
      };
  
      // Save the new order
      const newOrder = new orderModel(orderData);
      await newOrder.save();
  
      // Update the user's cartData (not cardData)
      const data = await userModel.findByIdAndUpdate(
        userId,
        { cartData: {} }, // Corrected to cartData
        { new: true }
      );
  
      res.json({ success: true, message: "Order placed" });
    } catch (error) {
      console.log(error);
      res.json({ success: false, message: error.message });
    }
  };
  

//Placing order using stripe
const placeOrderStripe = async (req, res)=>{

}

//Placing order using razorpay
const placeOrderRazorpay = async (req, res) =>{

}

//All orders data in admin panel
const allOrders = async (req, res) =>{
    try {
        const orders = await orderModel.find({})
        res.json({
            success:true,
            message:"All orders data",
            orders
        })

    } catch (error) {
        res.json({success:false, message:error.message})
    }
}

// All orders data in User panel
const userOrders = async (req, res) =>{
    const {userId} = req.body
    try {
        const orders = await orderModel.find({userId});
        res.json({success: true, orders})
        

    } catch (error) {
        console.log(error);
        res.json({success:false, message:error.message})
    }
}

// Update status from admin panel
const updateStatus = async (req, res) =>{
  try {
    const  {orderId, status} = req.body
    const order = await orderModel.findByIdAndUpdate(orderId, {status}, {new:true})
    console.log(order);
    
    res.json({success:true, message:"Status updated successfully"})

  } catch (error) {
    console.log(error);
        res.json({success:false, message:error.message})
  }
}


export {placeOrder, placeOrderStripe, placeOrderRazorpay, allOrders, userOrders, updateStatus}