import express from "express";
import {
  loginController,
  logoutController,
  updateUserPaymentController,
} from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/login", loginController);
router.get("/logout", logoutController);
router.post("/updatePayment", updateUserPaymentController);

export default router;
