import express from "express";

import {
  getCategories,
  deleteCategory,
  addCategory,
  editCategory,
  getCategory,
} from "../controllers/category.controller.js";

const router = express.Router();

router.route("/").get(getCategories);
router.route("/").post(addCategory);
router.route("/:id").get(getCategory);
router.route("/:id").delete(deleteCategory);
router.route("/:id").patch(editCategory);

export default router;
