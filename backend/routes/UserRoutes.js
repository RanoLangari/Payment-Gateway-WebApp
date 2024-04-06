import {
  loginUser,
  registerUser,
  getUserById,
} from "../controllers/UsersController.js";
import { isAuthorized } from "../utils/auth.js";
import express from "express";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/user", isAuthorized, getUserById);

export default router;
