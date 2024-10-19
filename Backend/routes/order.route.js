import express from 'express'
import {placeOrder, placeOrderStripe, placeOrderRazorpay, allOrders, userOrders, updateStatus} from '../controllers/order.controller.js'
import adminAuth from '../middleware/adminAuth.js'
import userAuth from '../middleware/auth.js'

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

export default orderRouter
