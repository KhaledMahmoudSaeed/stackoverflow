import moonoose, { model } from "mongoose";

const questionSchema = new moonoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

model.exports = moonoose.model("Question", questionSchema);
