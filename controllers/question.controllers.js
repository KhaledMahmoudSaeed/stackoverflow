import { asyncWarper } from "../middleware/asyncWrapper";
import QUESTION form "../models/question.model";

const index = asyncWarper(async (req, res) => {
  res.status(200).json({ message: "Question route is working" });
});
