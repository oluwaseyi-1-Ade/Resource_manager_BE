import express from "express";
import { validateToken, verifyAdmin } from "../middlewares/AuthMiddleware.js";
import {
  approveUser,
  getAllUsers,
  rejectUser,
  revokeUser,
} from "../controllers/UsersController.js";

const router = express.Router();

//get all users
router.get("/", validateToken, verifyAdmin, getAllUsers);

// approve user
router.patch("/:id/approve", validateToken, verifyAdmin, approveUser);

//reject user
router.patch("/:id/reject", validateToken, verifyAdmin, rejectUser);

//revoke user
router.patch("/:id/revoke", validateToken, verifyAdmin, revokeUser);

export default router;
