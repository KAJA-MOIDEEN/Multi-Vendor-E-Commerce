import express from 'express';
import userAuth from '../middleware/auth.js'; // Assuming vendor uses the same authentication
import { aggreProduct } from '../controllers/product.controller.js';

const vendorRouter = express.Router();

// Vendor Features

vendorRouter.get("/productGet",aggreProduct)

// Vendor can update the status of their orders

export default vendorRouter;
