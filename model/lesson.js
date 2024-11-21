import mongoose, { Schema } from "mongoose";

const lessonSchema = new Schema(
  {
    title: {
      required: true,
      type: String,
    },
    description: {
      required: true,
      type: String,
    },
    access: {
      required: true,
      type: String,
    },
    slug: {
      required: true,
      type: String,
    },
    videoUrl: {
      required: true,
      type: String,
    },
    published: {
      required: true,
      type: Boolean,
    },
    duration: {
      required: true,
      type: Number,
    },
  },
  {
    toJSON: {
      virtuals: true,
    },
    timestamps: true,
  }
);

export const Lesson =
  mongoose.models.Lesson ?? mongoose.model("Lesson", lessonSchema);
