

// add product to user cart

import userModel from "../models/user.model.js"

const addToCart = async (req, res) => {
    try { 
        const { userId, itemId, size } = req.body;
 
        // Fetch user data by Id
        const userData = await userModel.findById(userId);
        if (!userData) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        let cartData = userData.cartData || {};

        // Check if itemId exists in the cart
        if (cartData[itemId]) {
            // Check if the size exists for that item
            if (cartData[itemId][size]) {
                cartData[itemId][size] += 1;
            } else {
                cartData[itemId][size] = 1;
            }
        } else {
            // Initialize the itemId and size
            cartData[itemId] = {};
            cartData[itemId][size] = 1;
        }

        // Save updated cartData back to the user document
        await userModel.findByIdAndUpdate(userId, { cartData });

        res.json({ success: true, message: "Added To Cart" });
        
    } catch (error) {
        console.log(error); 
        res.status(500).json({ success: false, message: error.message });
    } 
};


// update user cart
const updateCart = async (req, res) => {
    try {
        const { userId, itemId, size, quantity } = req.body;

        // Find the user by ID
        const userData = await userModel.findById(userId);
        if (!userData) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        // Retrieve cartData
        let cartData = userData.cartData || {};

        // Ensure the item and size exist in the cart before updating
        if (cartData[itemId] && cartData[itemId][size] !== undefined) {
            cartData[itemId][size] = quantity;
        } else {
            return res.status(400).json({ success: false, message: "Item or size not found in cart" });
        }

        // Update cartData in the user document
        await userModel.findByIdAndUpdate(userId, { cartData });

        res.json({ success: true, message: "Cart updated successfully" });

    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: error.message });
    }
};

// get user cart data
const getUserCart =  async (req, res) => {

    try {
        const { userId }  = req.body
        const userData = await userModel.findById(userId)
        let cartData = userData.cartData || {}
         res.json({ success: true, cartData })
        
    } catch (error) {
        console.log(error);
        res.json({success:false, message:error.message})
        
    }

}

export { addToCart, updateCart,  getUserCart }  // export the functions