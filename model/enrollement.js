import mongoose, { Schema } from "mongoose";

const enrollmentSchema = new Schema(
  {
    enrollmentData: {
      type: Date,
      required: true,
    },
    completionDate: {
      type: Date,
      required: true,
    },
    status: {
      type: Boolean,
      required: true,
    },
    course: {
      type: Schema.ObjectId,
      ref: "Course",
    },
    student: {
      type: Schema.ObjectId,
      ref: "User",
    },
  },
  {
    toJSON: {
      virtuals: true,
    },
    timestamps: true,
  }
);

export const Enrollment =
  mongoose.models.Enrollment ?? mongoose.model("Enrollment", enrollmentSchema);
