import express from "express";
import authController from "../controller/auth.controller.js";
import authenticate from "../middleware/authentication.js";

const router = express.Router();

// Authentication routes
router.post("/auth/register", authController.register);
router.post("/auth/login", authController.login);
router.post("/auth/logout", authController.logout);
router.get("/auth/user", authenticate, authController.getCurrentUser);

export default router;
