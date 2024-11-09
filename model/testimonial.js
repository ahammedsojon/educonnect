import mongoose, { Schema } from "mongoose";

const testimonialSchema = new Schema(
  {
    content: {
      required: true,
      type: String,
    },
    user: {
      required: true,
      type: Schema.ObjectId,
      ref: "User",
    },
    course: {
      type: Schema.ObjectId,
      ref: "Course",
    },
    rating: {
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

export const Testimonial =
  mongoose.models.Testimonial ??
  mongoose.model("Testimonial", testimonialSchema);
