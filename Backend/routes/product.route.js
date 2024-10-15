import express from "express";
import {
  listProduct,
  addProduct,
  removeProduct,
  singleProduct,
} from "../controllers/product.controller.js";
import upload from "../middleware/multer.js";
import adminAuth from "../middleware/adminAuth.js";
import deletePrpductImages from "../middleware/cloudinaryMiddleware.js";

const productRouter = express.Router();

productRouter.post("/add",adminAuth,upload.fields([{name:'image1',maxCount:1},{name:'image2',maxCount:1},{name:'image3',maxCount:1},{name:'image4',maxCount:1},]),addProduct);
productRouter.post("/remove",adminAuth,deletePrpductImages,removeProduct);
productRouter.get("/single",singleProduct);
productRouter.get("/list",listProduct);



export default productRouter