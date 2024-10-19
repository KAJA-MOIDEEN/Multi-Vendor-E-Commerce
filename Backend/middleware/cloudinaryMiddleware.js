import productModel from "../models/product.model.js";
import { v2 as cloudinary } from "cloudinary";
import path from "path"; // Import path module
import sharp from  "sharp"; // Import sharp module

const deleteProfileImage = async (user, res) => {
  console.log(user);
  
  try {
    // Check if the user has an image set
    if (!user.image) {
      return res.status(400).json({
        success: false,
        message: 'No image to delete.',
      });
    }

    // Extract the publicId from the Cloudinary URL
    const publicId = await user.image.split('/').pop().split('.')[0]; // Extract file name without extension

    // Delete the image from Cloudinary
    await cloudinary.uploader.destroy(publicId);

    // Set the user image to null or remove the field (depending on your requirements)
    user.image = "your Local Url"; // Or you can do: delete user.image;
    await user.save(); // Save the user with the updated image
      
  } catch (error) {
    console.error('Error deleting profile image:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to delete the image. ' + error.message,
    });
  }
};


// Function to remove an image from Cloudinary
const removeImgFromCloudinary = async (publicId) => {
  try {
    const result = await cloudinary.uploader.destroy(publicId, {
      resource_type: "image",
      timeout: 300000, // Increase timeout for large image deletion
    });
    return result;
  } catch (error) {
    console.error("Error while deleting image:", error);
    throw new Error("Failed to delete image from Cloudinary");
  }
};

// Function to delete product images from Cloudinary and the database
const deleteProductImages = async (req, res, next) => {
  try {
    const { id } = req.body;

    // Find the product by its ID
    const product = await productModel.findById(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Extract publicIds from Cloudinary image URLs
    const imageUrls = product.image;
    const publicIds = imageUrls.map((url) => {
      // Extract publicId from the URL
      const publicId = path.basename(url, path.extname(url)); // Extract file name without extension
      return publicId;
    });

    // Delete each image from Cloudinary
    await Promise.all(
      publicIds.map(async (publicId) => {
        await removeImgFromCloudinary(publicId);
      })
    );

    // Move to the next middleware
    next();
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// i just test this form chatgpt 
const resizeImage = async (imagePath) => {
    return await sharp(imagePath)
      .resize({ width: 800 }) // Resize to 800px width
      .toBuffer();
  };

const uploadWithRetry = async (item, retries = 3) => {
    try {
      const resizedBuffer = await resizeImage(item.path); // Resize before upload
  
      const result = await new Promise((resolve, reject) => {
        cloudinary.uploader.upload_stream(
          { resource_type: "image", timeout: 300000 },
          (error, result) => {
            if (error) reject(error);
            resolve(result);
          }
        ).end(resizedBuffer);
      });
      return result.secure_url;
      
    } catch (error) {
      if (retries > 0) {
        console.log(`Retrying upload... (${3 - retries + 1})`);
        return await uploadWithRetry(item, retries - 1);
      }
      throw error;
    }
  };
  
  const addImgToCloudinary = async (images) => {
    try {
      const uploadResults = await Promise.all(
        images.map(item => uploadWithRetry(item))
      );
      return uploadResults;
    } catch (error) {
      console.error("Error uploading images after retries:", error);
      return [];
    }
  };  

// // Function to upload images to Cloudinary
// const addImgToCloudinary = async (images) => {
//   try {
//     const uploadResults = await Promise.all(
//       images.map(async (item) => {
//         const result = await cloudinary.uploader.upload(item.path, {
//           resource_type: "image",
//           timeout: 300000, // Increase timeout for large uploads
//         });
//         return result.secure_url;
//       })
//     );
//     return uploadResults; // Return the array of uploaded image URLs
//   } catch (error) {
//     console.error("Error uploading images:", error); // Log the entire error object
//     return []; // Return an empty array to handle the error safely
//   }
// };

export { deleteProductImages, addImgToCloudinary, deleteProfileImage};
