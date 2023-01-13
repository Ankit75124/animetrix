import express from "express";
import { register } from "../controllers/userController.js";


const router = express.Router();

// Register a user
router.route("/register").post(register);




export default router;
