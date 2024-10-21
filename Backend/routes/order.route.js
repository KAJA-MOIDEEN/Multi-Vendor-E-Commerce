import express from 'express'
import {verifyStripe, placeOrder, placeOrderStripe, placeOrderRazorpay, allOrders, userOrders, updateStatus, verifyRazorpay} from '../controllers/order.controller.js'
import adminAuth from '../middleware/adminAuth.js'
import userAuth from '../middleware/auth.js'
import authUser from '../middleware/auth.js'

const orderRouter = express.Router()

//Admin Features 
orderRouter.post('/list', adminAuth, allOrders)
orderRouter.post('/status', adminAuth, updateStatus)

//Payment Features
orderRouter.post('/place',userAuth, placeOrder)
orderRouter.post('/stripe',userAuth, placeOrderStripe)
orderRouter.post('/razorpay',userAuth, placeOrderRazorpay)

//user Features
orderRouter.post('/userorders',userAuth, userOrders)

//vendor Features
orderRouter.get('/vendororders',adminAuth,vendorOrder)


//verify payment
orderRouter.post('/verifyStripe', authUser, verifyStripe)
orderRouter.post('/verifyRazorpay', authUser, verifyRazorpay)

export default orderRouter
