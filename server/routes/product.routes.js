import express from "express";

import {
  addProduct,
  getAllProducts,
  getSingleProduct,
  deleteProduct,
  editProduct,
} from "../controllers/product.controller.js";
import { upload } from "../middleware/multer.middleware.js";

const router = express.Router();

router.route("/").post(upload.single("image"), addProduct);
router.route("/").get(getAllProducts);
router.route("/:id").get(getSingleProduct);
router.route("/:id").patch(editProduct);
router.route("/:id").delete(deleteProduct);

export default router;
