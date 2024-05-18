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

export { addProduct };
