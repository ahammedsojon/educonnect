import { replaceMongoIdInArray } from "@/lib/convertData";
import { Testimonial } from "@/model/testimonial";
import mongoose from "mongoose";

export async function getTestimonialForCourse(courseId) {
  const testimonials = await Testimonial.find({ course: courseId }).lean();
  return replaceMongoIdInArray(testimonials);
}
