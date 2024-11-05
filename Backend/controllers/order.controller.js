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
    const { userId, items, address , deliveryCharge } = req.body;
    console.log("strip",userId);
    

    if (!items || items.length === 0) {
      return res.status(400).json({ success: false, message: "No items to place an order" });
    }

    // const deliveryCharge = 10; // Fixed delivery charge per vendor
    let totalAmount = 0; // Initialize total amount for all orders

    // Group items by createdBy (vendor)
    const itemsByVendor = items.reduce((acc, item) => {
      const { ceratedBy } = item;
      if (!acc[ceratedBy]) acc[ceratedBy] = [];
      acc[ceratedBy].push(item);
      return acc;
    }, {});

    // Create an order for each vendor
    const orderPromises = Object.entries(itemsByVendor).map(async ([ceratedBy, vendorItems]) => {
      const vendorAmount = vendorItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
      const orderTotal = vendorAmount + deliveryCharge; // Include delivery charge in each vendor's order

      // Update the cumulative totalAmount
      totalAmount += orderTotal;

      const orderData = {
        userId,
        items: vendorItems,
        amount: orderTotal, // Amount for this vendor order including delivery charge
        address,
        deliveryCharge, // Track delivery charge for each vendor order if needed
        paymentMethod: 'COD',
        payment: false,
        date: Date.now(),
        ceratedBy,  // Associate each order with the vendor's ID
      };

      const newOrder = new orderModel(orderData);
      return newOrder.save();
    });

    // Wait for all orders to be saved
    await Promise.all(orderPromises);

    // Clear user's cartData after placing orders
    await userModel.findByIdAndUpdate(userId, { cartData: {} }, { new: true });

    // Respond with a success message and totalAmount for all orders
    res.json({ success: true, message: "Orders placed successfully", totalAmount });
  } catch (error) { 
    console.error("Error placing order:", error); 
    res.status(500).json({ success: false, message: "Failed to place orders" }); 
  } 
};

  

//Placing order using stripe
const placeOrderStripe = async (req, res) => {
  try {
    const { userId, items, address } = req.body;
    const { origin } = req.headers;

    const currency = 'usd'; // Define your currency
    const delivery_charges = 10; // Define delivery charges

    // Group items by vendor
    const itemsByVendor = items.reduce((acc, item) => {
      const { ceratedBy } = item; 
      if (!acc[ceratedBy]) acc[ceratedBy] = []; 
      acc[ceratedBy].push(item); 
      return acc;
    }, {});

    // Create a single array for line items for Stripe
    const line_items = [];
    
    // Save orders for each vendor
    const orderPromises = Object.entries(itemsByVendor).map(async ([vendorId, vendorItems]) => {
      const vendorAmount = vendorItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
      
      // Create line items for the vendor
      const vendorLineItems = vendorItems.map((item) => ({
        price_data: {
          currency: currency,
          product_data: {
            name: item.name,
          },
          unit_amount: item.price * 100, // Convert to cents
        },
        quantity: item.quantity,
      }));

      // Add delivery charges to the vendor line items
      vendorLineItems.push({
        price_data: {
          currency: currency,
          product_data: {
            name: "Delivery Charges",
          },
          unit_amount: delivery_charges * 100, // Convert to cents
        },
        quantity: 1,
      });

      // Save the order in the database for this vendor
      const newOrder = new orderModel({
        userId,
        items: vendorItems,
        amount: vendorAmount + delivery_charges, // Total amount for this vendor
        address,
        paymentMethod: 'Stripe',
        payment: false,
        date: Date.now(),
        ceratedBy: vendorId,
      });
      await newOrder.save();

      // Add vendor line items to the main line items
      line_items.push(...vendorLineItems);

      return newOrder; // return the order object if needed
    });

    // Wait for all vendor orders to be saved
    await Promise.all(orderPromises); 

    // Create a single Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      success_url: `${origin}/verify?success=true`,
      cancel_url: `${origin}/verify?success=false`,
      line_items,
      mode: "payment",
    });

    // Respond with session URL
    res.json({
      success: true,
      session_url: session.url,
    });

  } catch (error) {
    console.error('Error creating Stripe session:', error); 
    res.status(500).json({ success: false, message: 'Failed to create Stripe session. Please try again later.' }); 
  } 
};


// Verify Stripe Payment
const verifyStripe = async (req, res) => {
  const { success, userId } = req.body; // We no longer need orderId here

  try {
    if (success === "true") {
      // Find all orders that belong to the user and mark them as paid
      const orders = await orderModel.find({ userId, payment: false });

      for (const order of orders) {
        await orderModel.findByIdAndUpdate(order._id, { payment: true });
      }
      
      // Clear the user's cart
      await userModel.findByIdAndUpdate(userId, { cartData: {} });

      res.json({ success: true });
    } else {
      // Handle payment failure, you can choose to delete the orders or mark them as unpaid
      await orderModel.updateMany({ userId, payment: false }, { $set: { payment: false } }); // Mark orders as unpaid
      res.json({ success: false, message: "Payment Failed" });
    }
  } catch (error) { 
    console.log(error); 
    res.json({ success: false, message: error.message }); 
  } 
};


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

// Vendor Order for vendor panel only vendor's own orders

const vendorOrder = async (req, res) =>{
  try {
    // const {userId} =  req.body

    // console.log(userId);
    
    // const orders = await orderModel.find({userId});
    
    // res.json({
    //   success:true,
    //   message:"Vendor orders data",
    //   orders
    //   })

      } catch (error) {
        // res.json({success:false, message:error.message})
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


export {verifyRazorpay, verifyStripe, placeOrder, placeOrderStripe, placeOrderRazorpay, allOrders, userOrders, updateStatus, vendorOrder}