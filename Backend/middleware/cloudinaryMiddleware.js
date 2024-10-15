import productModel  from "../models/product.model.js"
import { v2 as cloudinary } from "cloudinary";

const removeImgFromCloudinary = async (publicId)=>{
    try {
        const result = await cloudinary.uploader.destroy(publicId,{
            resource_type: "image",
        });
        // console.log("Image deleted from Cloudinary:", result);
        return result;
    } catch (error) {
        console.error("Error while deleting image:", error);
        throw new Error("Failed to delete image from Cloudinary");
    }
}
const deletePrpductImages = async(req,res,next)=>{
    try {
        const { id } = req.body
        const product = await productModel.findById(id)
        if (!product) {
            return res.status(404).json({ message: "Product not found" })
            }

        // Extract Public Ids from URL
        const imageUrls = product.image;

        const publicIds = imageUrls.map((url)=>{
            const publicId = url.split('/').pop().split('.')[0];
            return publicId
        });
        // Delete Images from Cloudinary
        await Promise.all(
            publicIds.map( async (publicId) => {
                await removeImgFromCloudinary(publicId);
            }
        ));
        next()
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: error.message,
          });
    }
}
export const addImgToCloudinary = async(images)=>{
    await Promise.all(
        images.map(async (item) => {
          let result = await cloudinary.uploader.upload(item.path, {
            resource_type: "image",
          });
          return result.secure_url;
        })
      );
} 

export default deletePrpductImages