import express from "express";

import { registerUser, loginUser } from "../controllers/user.controller.js";

const router = express.Router();

router.route("/signUp").post(registerUser)
router.route("/signIn").post(loginUser)

export default router;