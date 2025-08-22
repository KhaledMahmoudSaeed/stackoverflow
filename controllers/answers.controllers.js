import { asyncWarper } from "../middleware/asyncWrapper.js";
import ANSWER from "../models/answers.models.js";
import { errorHandler } from "../utilities/errorHandler.js";
export const index = asyncWarper(async (req, res, next) => {
    const answers = await ANSWER.find()
    if(!answers){   
        return next(errorHandler.create("Answers not found","fail",404)); 
    }
    res.status(200).json({
        success: true,
        status:200,
        message: "Answers has retrieved ",
        data: answers
    });
})
export const show = asyncWarper(async (req, res, next) => {
    const answer = await ANSWER.findById(req.params.id);
    if(!answer){   
        return next(errorHandler.create("Answer not found","fail",404)); 
    }
    res.status(200).json({
        success: true,
        status:200,
        message: "Answer has retrieved ",
        data: answer
    });
})
export const create = asyncWarper(async (req, res, next) => {  
    if(!req.body.questionId|| !req.body.answer){
        return next(errorHandler.create("missed paramter","fail",400)); 
    } 
    const answer = await ANSWER.create(req.body);
    if(!answer){   
        return next(errorHandler.create("Answer not created","fail",404)); 
    }
    res.status(201).json({
        success: true,
        status:201,
        message: "Answer has been created",
        data: answer
    });
})
export const update = asyncWarper(async (req, res, next) => {
    const answer = await ANSWER.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    }); 
    if(!answer){   
        return next(errorHandler.create("Answer not found","fail",404)); 
    }
    res.status(200).json({
        success: true,
        status:200,
        message: "Answer has been updated",
        data: answer
    });
})
export const destroy = asyncWarper(async (req, res, next) => {
    const answer = await ANSWER.findByIdAndDelete(req.params.id);
    if(!answer){   
        return next(errorHandler.create("Answer not found","fail",404)); 
    }
    res.status(200).json({
        success: true,
        status:204,
        message: "Answer has been deleted",
        data: {}
    });
})

