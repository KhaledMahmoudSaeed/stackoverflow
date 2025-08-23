import { asyncWarper } from "../middleware/asyncWrapper.js";
import QUESTION from "../models/questions.models.js";
import { errorHandler } from "../utilities/errorHandler.js";
export const index = asyncWarper(async (req, res) => {
  const questions = await QUESTION.find();
  if (!questions) {
    return next(errorHandler.create.create("No questions found", "fail", 404));
  }
  res.status(200).json({
    success: true,
    status: 200,
    data: questions,
    message: "Questions fetched successfully",
  });
});
export const show = asyncWarper(async (req, res, next) => {
  const question = await QUESTION.findById(req.params.id);
  if (!question) {
    return next(errorHandler.create("Question not found", "fail", 404));
  }
  res.status(200).json({
    success: true,
    status: 200,
    data: question,
    message: "Question fetched successfully",
  });
});
export const create = asyncWarper(async (req, res, next) => {
  const { title, description } = req.body;
  if (!title || !description) {
    return next(
      errorHandler.create("Title and description are required", "fail", 400)
    );
  }
  const question = await QUESTION.create({ title, description });
  res.status(201).json({
    success: true,
    status: 201,
    data: question,
    message: "Question created successfully",
  });
});
export const update = asyncWarper(async (req, res, next) => {
  const { title, description } = req.body;

  const question = await QUESTION.findByIdAndUpdate(
    req.params.id,
    { title, description },
    { new: true, runValidators: true }
  );
  if (!question) {
    return next(errorHandler.create("Question not found", "fail", 404));
  }
  res.status(200).json({
    success: true,
    status: 200,
    data: question,
    message: "Question updated successfully",
  });
});
export const destroy = asyncWarper(async (req, res, next) => {
  const question = await QUESTION.findByIdAndDelete(req.params.id);
  if (!question) {
    return next(errorHandler.create("Question not found", "fail", 404));
  }
  res.status(200).json({
    success: true,
    status: 200,
    data: null,
    message: "Question deleted successfully",
  });
});
