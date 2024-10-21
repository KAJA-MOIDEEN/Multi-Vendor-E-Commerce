import express from 'express';
import userAuth from '../middleware/auth.js'; // Assuming vendor uses the same authentication
import { aggreProduct } from '../controllers/product.controller.js';
import adminAuth from '../middleware/adminAuth.js';
import { getVendorOrders, vendorProducts } from '../controllers/vendor.controller.js';

const vendorRouter = express.Router();

// Vendor Features
vendorRouter.get("/productGet",aggreProduct)
vendorRouter.get("/vensorProduct",adminAuth,vendorProducts)
vendorRouter.get("/vendorOrders",adminAuth,getVendorOrders)

// Vendor can update the status of their orders

export default vendorRouter;
