import express from 'express';
import userAuth from '../middleware/auth.js'; // Assuming vendor uses the same authentication
import { aggreProduct } from '../controllers/product.controller.js';
import adminAuth from '../middleware/adminAuth.js';
import { getVendorOrders, vendorProducts ,adminGetVendorProducts,deleteVendor} from '../controllers/vendor.controller.js';

const vendorRouter = express.Router();

// Vendor Features
vendorRouter.get("/productGet",aggreProduct);
vendorRouter.get("/vendor/:userId",adminAuth,adminGetVendorProducts);
vendorRouter.get("/vensorProduct",adminAuth,vendorProducts);
vendorRouter.get("/vendorOrders",adminAuth,getVendorOrders);
vendorRouter.post("/deleteVendor",adminAuth,deleteVendor)


// Vendor can update the status of their orders

export default vendorRouter;
