import { asyncHandler } from "../utils/asyncHandler.js";
import Order from "../models/order.model.js";
import { ApiError } from "../utils/ApiError.js";

const addOrder = asyncHandler(async (req, res) => {
  const { name, qty, image, price, productId } = req.body;

  if (!name || !qty || !image || !price || !productId) {
    throw new ApiError(400, "All fields are required.");
  }

  const order = await Order.create({
    userId: req.user._id,
    orderItems: { name, qty, image, price, productId },
  });

  return res.status(201).json({
    status: "success",
    message: "Order added successfully",
    data: order,
  });
});

const getOrdersByUser = asyncHandler(async (req, res) => {
  const orders = await Order.find({
    userId: req.user._id,
  });
  return res.status(200).json({
    status: "success",
    results: orders.length,
    orders,
  });
});

const getAllOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find();
  return res.status(200).json({
    status: "success",
    results: orders.length,
    orders,
  });
});

const deleteOrder = asyncHandler(async (req, res) => {
  const order = await Order.findByIdAndDelete(req.params.id);
  return res.status(200).json({
    status: "success",
    message: "Order deleted successfully",
    deleteOrder: order,
  });
});

export { getOrdersByUser, addOrder, deleteOrder, getAllOrders };
