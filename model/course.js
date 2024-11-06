import mongoose, { Schema } from "mongoose";

const courseSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    subTitle: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    thumbnail: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    active: {
      type: Boolean,
      required: true,
    },
    category: {
      type: Schema.ObjectId,
      ref: "Category",
    },
    modules: [
      {
        type: Schema.ObjectId,
        ref: "Module",
      },
    ],
    instructor: {
      type: Schema.ObjectId,
      ref: "User",
    },
    quizzes: {
      type: Schema.ObjectId,
      required: true,
    },
    testimonials: [
      {
        type: Schema.ObjectId,
        ref: "Testimonial",
      },
    ],
  },
  {
    toJSON: {
      virtuals: true,
    },
    timestamps: true,
  }
);

export const Course =
  mongoose.models.Course ?? mongoose.model("Course", courseSchema);
