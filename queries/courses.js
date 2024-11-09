import {
  replaceMongoIdInArray,
  replaceMongoIdInObject,
} from "@/lib/convertData";
import { Category } from "@/model/category";
import { Enrollment } from "@/model/enrollement";
import { Module } from "@/model/module";
import { Testimonial } from "@/model/testimonial";
import { User } from "@/model/user";
import { getEnrollmentForCourse } from "./enrollments";
import { getTestimonialForCourse } from "./testimonials";

const { Course } = require("@/model/course");

export async function getCourseList() {
  const result = await Course.find({})
    .populate({
      path: "category",
      model: Category,
    })
    .populate({
      path: "instructor",
      model: User,
    })
    .populate({
      path: "testimonials",
      model: Testimonial,
    })
    .populate({
      path: "modules",
      model: Module,
    })
    .lean();

  return replaceMongoIdInArray(result);
}

export async function getCourseById(id) {
  const result = await Course.findById(id)
    .populate({
      path: "category",
      model: Category,
    })
    .populate({
      path: "instructor",
      model: User,
    })
    .populate({
      path: "testimonials",
      model: Testimonial,
      populate: {
        path: "user",
        model: User,
      },
    })
    .populate({
      path: "modules",
      model: Module,
    })
    .lean();

  return replaceMongoIdInObject(result);
}

export async function getCourseDetailsByInstructor(instructorId) {
  let courses = await Course.find({ instructor: instructorId }).lean();

  const enrollments = await Promise.all(
    courses.map(async ({ _id }) => {
      const enrollment = await getEnrollmentForCourse(_id);
      return enrollment;
    })
  );
  const testimonials = await Promise.all(
    courses.map(async ({ _id }) => {
      const testimonial = await getTestimonialForCourse(_id);
      return testimonial;
    })
  );
  return {
    courses,
    enrollments,
    testimonials,
  };
}
