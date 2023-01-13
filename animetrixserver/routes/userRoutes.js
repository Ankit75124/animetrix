import express from "express";
import { register, login, logout } from "../controllers/userController.js";


const router = express.Router();

// Register a user
router.route("/register").post(register);

// login
router.route("/login").post(login);

// logout
router.route("/logout").get(logout);


export default router;
