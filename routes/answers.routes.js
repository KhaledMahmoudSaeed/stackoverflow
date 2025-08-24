import express from "express";
import {
  index,
  show,
  create,
  update,
  destroy,
} from "../controllers/answers.controllers.js";
import { auth } from "../middleware/auth.js";

const router = express.Router();

router.get("/", index);
router.get("/:id", show);
router.post("/", auth, create);
router.put("/:id", auth, update);
router.delete("/:id", auth, destroy);

export default router;
