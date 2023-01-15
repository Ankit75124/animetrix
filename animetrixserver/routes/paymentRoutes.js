import express from "express";
import { buysubscription } from "../controllers/paymentController.js";
import { isAuthenticated } from "../middlewares/auth.js";


const router = express.Router();

// Buy Subscription
router.route("/subscribe").get(isAuthenticated, buysubscription);


export default router;
