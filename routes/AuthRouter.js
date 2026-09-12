import express from "express";
import { login, logout, register, userDetails } from "../controllers/AuthController.js";
import { validateToken } from "../middlewares/AuthMiddleware.js";

const router = express.Router();

router.post("/register", register);

router.post("/login", login);

router.get("/me", validateToken, userDetails);

router.post("/logout", validateToken, logout);

export default router;
