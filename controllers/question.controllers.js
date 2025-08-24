import { asyncWarper } from "../middleware/asyncWrapper.js";
import QUESTION from "../models/questions.models.js";
import { errorHandler } from "../utilities/errorHandler.js";
export const index = asyncWarper(async (req, res, next) => {
  let questions;
  if (req.query.category) {
    const category = req.query.category;
    questions = await QUESTION.find(
      { category: new RegExp(category, "i") },
      { __v: 0, createdAt: 0, updatedAt: 0 }
    );
  } else {
    questions = await QUESTION.find({}, { __v: 0, createdAt: 0, updatedAt: 0 });
  }
  if (questions.length === 0) {
    return next(errorHandler.create("No questions found", "fail", 404));
  }
  res.status(200).json({
    success: true,
    status: 200,
    data: questions,
    message: "Questions fetched successfully",
  });
});
export const show = asyncWarper(async (req, res, next) => {
  const question = await QUESTION.findById(req.params.id, {
    __v: 0,
    createdAt: 0,
    updatedAt: 0,
  });
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
  const { category, title, description } = req.body;
  if (!title || !description || !category) {
    return next(errorHandler.create("missed paramter", "fail", 400));
  }
  const question = await QUESTION.create({ category, title, description });
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
export const findByCategory = asyncWarper(async (req, res, next) => {
  if (questions.length === 0) {
    return next(errorHandler.create("No questions found", "fail", 404));
  }
  res.status(200).json({
    success: true,
    status: 200,
    count: questions.length,
    data: questions,
    message: "Questions fetched successfully",
  });
});
