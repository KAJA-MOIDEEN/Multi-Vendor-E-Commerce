import express from 'express';
import userAuth from '../middleware/auth.js'; // Assuming vendor uses the same authentication

const vendorRouter = express.Router();

// Vendor Features

// Vendor can update the status of their orders

export default vendorRouter;
