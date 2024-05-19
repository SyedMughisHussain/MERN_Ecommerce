import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

import Product from "../models/product.model.js";

const addProduct = asyncHandler(async (req, res) => {
  console.log(req.file.path);

  const { name, price, description, categoryId, countInStock } = req.body;

  if (!name || !price || !description || !categoryId || !countInStock) {
    throw new ApiError(400, "All fields are required.");
  }

  const productExist = await Product.findOne({ name });

  if (productExist) {
    throw new ApiError(400, "Product already exists.");
  }

  const imageLocalPath = req.file.path;

  if (!imageLocalPath) {
    throw new ApiError(400, "Image is required.");
  }

  const image = await uploadOnCloudinary(imageLocalPath);

  if (!image) {
    throw new ApiError(400, "Image is required.");
  }

  const product = await Product.create({
    name,
    price,
    description,
    image: image.url,
    categoryId,
    countInStock,
  });

  return res.status(201).json({
    status: "success",
    product,
    message: "Product added successfully",
  });
});

const getAllProducts = asyncHandler(async (req, res) => {
  const products = await Product.find();
  return res.status(200).json({
    status: "success",
    results: products.length,
    products,
  });
});

const getSingleProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    throw new ApiError(404, "Product not found.");
  }

  return res.status(200).json({
    status: "success",
    product,
  });
});

const editProduct = asyncHandler(async (req, res) => {
  const { name, price, description, categoryId, countInStock } = req.body;

  if (!name || !price || !description || !categoryId || !countInStock) {
    throw new ApiError(400, "All fields are required.");
  }

  const product = await Product.findByIdAndUpdate(
    req.params.id,
    {
      name,
      price,
      description,
      categoryId,
      countInStock,
    },
    {
      new: true,
    }
  );

  return res.status(200).json({
    status: "success",
    product,
    message: "Product updated successfully",
  });
});

const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findByIdAndDelete(req.params.id);
  return res.status(200).json({
    status: "success",
    deleteProduct: product,
    message: "Product deleted successfully",
  });
});

export {
  addProduct,
  getAllProducts,
  getSingleProduct,
  editProduct,
  deleteProduct,
};
