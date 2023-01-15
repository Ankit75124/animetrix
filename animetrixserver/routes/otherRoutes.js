import express from "express";
import { animeRequest, contact, getDashboardStats } from "../controllers/othersController.js";
import { authorizeAdmin, isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

// Contact form
router.route("/contact").post(contact);
// Contact form
router.route("/animerequest").post(isAuthenticated, animeRequest);

// Get Admin Dashboard Stats
 router.route("/admin/stats").get(isAuthenticated, authorizeAdmin, getDashboardStats);

export default router;
