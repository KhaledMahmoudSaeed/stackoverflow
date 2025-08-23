import express from "express";
import {
  index,
  show,
  create,
  update,
  destroy,
  findByCategory,
} from "../controllers/question.controllers.js";

const router = express.Router();

router.get("/", index);
router.get("/:id", show);
router.post("/", create);
router.put("/:id", update);
router.delete("/:id", destroy);
router.get("/category/:category", findByCategory);
export default router;
