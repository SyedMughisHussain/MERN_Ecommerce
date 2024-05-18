import express from 'express';

import { addProduct } from '../controllers/product.controller.js';
import { upload } from '../middleware/multer.middleware.js';

const router = express.Router();

router.route('/').post(upload.single('image'), addProduct);

export default router;