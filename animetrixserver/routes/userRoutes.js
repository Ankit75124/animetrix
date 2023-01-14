import express from "express";
import {
  register,
  login,
  logout,
  getMyProfile,
} from "../controllers/userController.js";
import { isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

// Register a user
router.route("/register").post(register);

// login
router.route("/login").post(login);

// logout
router.route("/logout").get(logout);

// My Profile
router.route("/me").get(isAuthenticated, getMyProfile);




export default router;
