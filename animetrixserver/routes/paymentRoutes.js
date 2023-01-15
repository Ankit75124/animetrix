import express from "express";
import { buysubscription, getRazorpayKey, paymentVerification } from "../controllers/paymentController.js";
import { isAuthenticated } from "../middlewares/auth.js";


const router = express.Router();

// Buy Subscription
router.route("/subscribe").get(isAuthenticated, buysubscription);

// Payment Verification and save reference in database
router.route("/paymentverification").post(isAuthenticated, paymentVerification);

// get razorpay key
router.route("/razorpaykey").get(getRazorpayKey);


export default router;
