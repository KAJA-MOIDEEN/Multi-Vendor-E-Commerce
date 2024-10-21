import express from "express";
import {
  listProduct,
  addProduct,
  removeProduct,
  singleProduct,
} from "../controllers/product.controller.js";
import upload from "../middleware/multer.js";
import adminAuth from "../middleware/adminAuth.js";
import {deleteProductImages} from "../middleware/cloudinaryMiddleware.js";

const productRouter = express.Router();

productRouter.post("/add",upload.fields([{name:'image1',maxCount:1},{name:'image2',maxCount:1},{name:'image3',maxCount:1},{name:'image4',maxCount:1},]),adminAuth,addProduct);
productRouter.post("/remove",adminAuth,deleteProductImages,removeProduct);
productRouter.get("/single",singleProduct);
productRouter.get("/list",listProduct);



export default productRouter