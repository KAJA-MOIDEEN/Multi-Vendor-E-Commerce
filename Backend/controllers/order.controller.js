import Stripe from "stripe";
import razorpay from 'razorpay'
import orderModel from "../models/order.model.js";
import userModel from "../models/user.model.js";

//Global Variables
const currency = 'inr'
const delivery_charges = 10

// Gateway initialization
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)
const razorpayInstance = new razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET
})

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

  try {


    const { userId, items, amount, address } = req.body;

    const {origin} = req.headers;

    const orderData = {
      userId,
      items,
      amount,
      address,
      paymentMethod: 'Stripe',
      payment: false,
      date: Date.now(),
    };

    const newOrder = new orderModel(orderData);
    await newOrder.save();

    const line_items = items.map((item) => ({
      price_data: {
        currency: currency,
        product_data: {
          name: item.name
        },
        unit_amount: item.price * 100 
      },
      quantity: item.quantity
    }))

    line_items.push({
      price_data: {
        currency: currency,
        product_data: {
          name: "Delivery Charges"
        },
        unit_amount: delivery_charges * 100
      },
      quantity: 1
    })

    const sessions = await stripe.checkout.sessions.create({
      success_url: `${origin}/verify?success=true&orderId=${newOrder._id}`,
      cancel_url: `${origin}/verify?success=false&orderId=${newOrder._id}`,
      line_items,
      mode: "payment"
    })

    res.json({
      success: true,session_url: sessions.url
    })



  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }

}

//Verify Stripe
const verifyStripe = async(req, res)=>{
  const {orderId, success, userId} = req.body

  try {
    if(success === "true"){
      await orderModel.findByIdAndUpdate(orderId, {payment: true})
      await userModel.findByIdAndUpdate(userId, {cartData: {}})
      res.json({
        success: true
      })
    }
    else{
      await orderModel.findByIdAndDelete(orderId)
      res.json({success: false, message: error.message})
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
}

//Placing order using razorpay
const placeOrderRazorpay = async (req, res) =>{
  try {
    const { userId,items,amount,address}  = req.body;

    const orderData = {
      userId,
      items,
      amount,
      address,
      paymentMethod: 'Razorpay',
      payment: false,
      date: Date.now(),


    }
    const newOrder = new orderModel(orderData);
    await newOrder.save();

    const options = {
      amount: amount * 100,
      currency: currency.toUpperCase(),
      receipt: newOrder._id.toString()


    }
    await razorpayInstance.orders.create(options,(error,order)=>{
      if(error) {
        
        console.log(error);
        return res.json({success:false,message:error})
        
      }
      res.json({success:true,order})

    })
    
  } catch (error) {
    console.log(error);
    res.json({success:false,message:error.message})
    
  }

}

// Verify Razorpay
const verifyRazorpay = async (req, res)=>{
  try {
    const {userId, razorpay_order_id } = req.body

    const orderInfo = await razorpayInstance.orders.fetch(razorpay_order_id)
    if(orderInfo.status === 'paid'){
      await orderModel.findByIdAndUpdate(orderInfo.receipt, {payment: true})
      await userModel.findByIdAndUpdate(userId, {cartData:{}})
      res.json({success: true, message: "Payment Successfull"})
    }else{
      res.json({success: false, message: "Payment Failed"})
    }

  } catch (error) {
    console.log(error);
    res.json({success:false,message:error.message})
  }
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


export {verifyRazorpay, verifyStripe, placeOrder, placeOrderStripe, placeOrderRazorpay, allOrders, userOrders, updateStatus}