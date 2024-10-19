import express from 'express';
import { vendorOrders, updateVendorOrderStatus } from '../controllers/vendor.controller.js';
import userAuth from '../middleware/auth.js'; // Assuming vendor uses the same authentication

const vendorRouter = express.Router();

// Vendor Features
vendorRouter.get('/orders', userAuth, vendorOrders); // Vendor can view their own orders
vendorRouter.patch('/orders/:orderId/status', userAuth, updateVendorOrderStatus); // Vendor can update the status of their orders

export default vendorRouter;
