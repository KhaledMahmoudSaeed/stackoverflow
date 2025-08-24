import express from "express";
const router = express.Router();
import {
  register,
  getCurrentUser,
  login,
} from "../controllers/user.controllers.js";

router.post("/register", register);
router.post("/login", login);
router.get("/me", getCurrentUser);

export default router;
