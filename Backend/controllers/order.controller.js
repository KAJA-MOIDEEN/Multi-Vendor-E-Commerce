import orderModel from "../models/order.model.js";
import userModel from "../models/user.model.js";

//Placing order 
const placeOrder = async (req, res) =>{
    try {
        const {userId, items, amount, address} = req.body;

        const orderData = {
            userId,
            items,
            amount,
            address,
            paymentMethod:'COD',
            payment:false,
            date: Date.now()
        }

        const newOrder = new orderModel(orderData)
        await newOrder.save()

        await userModel.findOneAndUpdate(userId, {cartData:{}})

        res.json({success: true, message: "Order placed"})

    } catch (error) {
        console.log(error);
        res.json({success:false, message:error.message})
        
    }
    
}

//Placing order using stripe
const placeOrderStripe = async (req, res)=>{

}

//Placing order using razorpay
const placeOrderRazorpay = async (req, res) =>{

}

//All orders data in admin panel
const allOrders = async (req, res) =>{

}

// All orders data in User panel
const userOrder = async (req, res) =>{

}

// Update status from admin panel
const updateStatus = async (req, res) =>{

}

export {placeOrder, placeOrderStripe, placeOrderRazorpay, allOrders, userOrder, updateStatus}