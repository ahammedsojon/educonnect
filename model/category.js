import mongoose, { Schema } from "mongoose";

const categorySchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  status: {
    type: Boolean,
    required: true,
  },
  slug: {
    type: String,
    required: true,
  },
  course: {
    type: Schema.ObjectId,
    ref: "Course",
  },
  lessonIds: [
    {
      type: Schema.ObjectId,
      ref: "Lesson",
    },
  ],
});

export const Category =
  mongoose.models.Category ?? mongoose.model("Category", categorySchema);
