import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import questionRouter from "./routes/question.routes.js";
import answerRouter from "./routes/answers.routes.js";
import { invaildRouter, errorDisplay } from "./middleware/routesHanldler.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/questions", questionRouter);
app.use("/api/answers", answerRouter);
import usersRouter from "./routes/users.routes.js";
app.use("/api/users", usersRouter);
// Catch all invalid routes
app.use(invaildRouter);
app.use(errorDisplay);

mongoose
  .connect(process.env.DB_URL)
  .then(() => {
    app.listen(process.env.PORT || 3000, () => {
      console.log(`Server is running on port ${process.env.PORT || 3000}`);
    });
    console.log("Connected!");
  })
  .catch((err) => console.log(err));
