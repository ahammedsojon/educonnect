import mongoose, { Schema } from "mongoose";

const reportSchema = new Schema({
  totalCompletedLessons: {
    required: true,
    type: Array,
  },
  totalCompletedModeules: {
    required: true,
    type: Array,
  },
  course: {
    required: true,
    type: Schema.ObjectId,
    ref: "Course",
  },
  student: {
    required: true,
    type: Schema.ObjectId,
    ref: "User",
  },
  quizAssessment: {
    required: true,
    type: Schema.ObjectId,
    ref: "Assessment",
  },
});

export const Report =
  mongoose.models.Report ?? mongoose.model("Report", reportSchema);
