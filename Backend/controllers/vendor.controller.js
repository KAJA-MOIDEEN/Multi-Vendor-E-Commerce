import orderModel from '../models/order.model.js';

// Get all orders placed with the specific vendor
const vendorOrders = async (req, res) => {
  try {
    // Assuming the vendor's ID is attached to the request via auth middleware
    const vendorId = req.user.userId;

    // Fetch all orders where the vendorId matches the authenticated vendor's ID
    const orders = await orderModel.find({ vendorId });

    // Check if orders exist for the vendor
    if (!orders || orders.length === 0) {
      return res.status(404).json({ success: false, message: "No orders found for this vendor." });
    }

    // Send the response with the vendor's orders
    res.json({
      success: true,
      message: "Vendor's orders retrieved successfully.",
      orders
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Update the status of an order by the vendor (optional)
const updateVendorOrderStatus = async (req, res) => {
  try {
    const { orderId, status } = req.body;

    // Find the order and update its status if the vendorId matches the authenticated vendor
    const updatedOrder = await orderModel.findOneAndUpdate(
      { _id: orderId, vendorId: req.user.userId },
      { status },
      { new: true }
    );

    if (!updatedOrder) {
      return res.status(404).json({ success: false, message: "Order not found or you're not authorized to update this order." });
    }

    res.json({ success: true, message: "Order status updated successfully.", updatedOrder });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export { vendorOrders, updateVendorOrderStatus };
