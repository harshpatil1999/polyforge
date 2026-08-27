import express from "express";
import {
  deductCreditsController,
  loginController,
  logoutController,
  updateUserPaymentController,
} from "../controllers/auth.controllers.js";

const router = express.Router();

router.post("/login", loginController);
router.get("/logout", logoutController);
router.post("/updatePayment", updateUserPaymentController);
router.post("/deductCredits", deductCreditsController);

export default router;
