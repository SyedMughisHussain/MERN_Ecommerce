import express from 'express';

import { getOrdersByUser, deleteOrder, addOrder, getAllOrders } from '../controllers/order.controller.js';
import { verifyJWT } from '../middleware/auth.middleware.js';

const router = express.Router();

router.route("/").get(verifyJWT, getOrdersByUser)
router.route("/getAllOrders").get(verifyJWT, getAllOrders)
router.route("/").post(verifyJWT, addOrder)
router.route("/:id").delete(verifyJWT, deleteOrder)

export default router;