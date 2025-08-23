import moonoose, { model } from "mongoose";

const answerSchema = new moonoose.Schema(
  {
    questionId: {
      type: moonoose.Schema.Types.ObjectId,
      ref: "Question",
      required: true,
    },
    answer: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Answer", answerSchema);
