import Category from "../models/category.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const addCategory = asyncHandler(async (req, res) => {
  const { name } = req.body;

  if (!name) {
    throw new ApiError(400, "All fields are required.");
  }

  const categoryExist = await Category.findOne({ name });

  if (categoryExist) {
    throw new ApiError(400, "Category already exists.");
  }

  const category = await Category.create({ name });

  return res.status(201).json({
    status: "success",
    category,
    message: "Category added successfully",
  });
});

const getCategories = asyncHandler(async (req, res) => {
  const categories = await Category.find();

  return res.status(200).json({
    status: "success",
    results: categories.length,
    categories,
  });
});

const getCategory = asyncHandler(async (req, res) => {
  const category = await Category.findById(req.params.id);

  if (!category) {
    throw new ApiError(404, "Category not found");
  }

  return res.status(200).json({
    status: "success",
    category,
  });
});

const editCategory = asyncHandler(async (req, res) => {
  const { name } = req.body;

  const category = await Category.findByIdAndUpdate(
    req.params.id,
    {
      name,
    },
    {
      new: true,
    }
  );

  return res.status(200).json({
    status: "success",
    message: "Category updated successfully",
    category,
  });
});

const deleteCategory = asyncHandler(async (req, res) => {
  const category = await Category.findByIdAndDelete(req.params.id);

  if (!category) {
    throw new ApiError(404, "Category not found");
  }

  return res.status(200).json({
    status: "success",
    message: "Category deleted successfully",
    category,
  });
});

export {
  addCategory,
  getCategories,
  getCategory,
  deleteCategory,
  editCategory,
};
