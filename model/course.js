import mongoose, { Schema } from "mongoose";

const courseSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    subtitle: {
      type: String,
    },
    description: {
      type: String,
    },
    thumbnail: {
      type: String,
    },
    price: {
      type: Number,
      default: 0,
      required: true,
    },
    active: {
      type: Boolean,
      default: false,
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
