import mongoose, { Schema } from "mongoose";

const enrollmentSchema = new Schema(
  {
    enrollmentDate: {
      type: Date,
      required: true,
    },
    completionDate: {
      type: Date,
      required: false,
    },
    status: {
      type: String,
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
    method: {
      type: String,
      required: true,
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
