import { asyncHandler } from "../utils/asyncHandler.js";

const addProduct = asyncHandler(async (req, res) => {
  const { name, price, description, category, countInStock } = req.body;

  if (!name || !price || !description || !category || !countInStock) {
    throw new ApiError(400, "All fields are required.");
  }

  const productExist = await Product.findOne({ name });

  if (productExist) {
    throw new ApiError(400, "Product already exists.");
  }

  

});

export { addProduct };
