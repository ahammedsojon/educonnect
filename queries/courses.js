import {
  replaceMongoIdInArray,
  replaceMongoIdInObject,
} from "@/lib/convertData";
import { Category } from "@/model/category";
import { Course } from "@/model/course";
import { Module } from "@/model/module";
import { Testimonial } from "@/model/testimonial";
import { User } from "@/model/user";
import { getEnrollmentForCourse } from "./enrollments";
import { getTestimonialForCourse } from "./testimonials";

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

  return replaceMongoIdInObject(JSON.parse(JSON.stringify(result)));
}

export async function getCourseDetailsByInstructor(instructorId, expand) {
  let publishedCourses = await Course.find({
    instructor: instructorId,
    active: true,
  }).lean();

  const enrollments = await Promise.all(
    publishedCourses.map(async ({ _id }) => {
      const enrollment = await getEnrollmentForCourse(_id);
      return enrollment;
    })
  );
  function groupBy(array, keyFn) {
    return array.reduce((result, item) => {
      const key = keyFn(item);
      if (!result[key]) {
        result[key] = [];
      }
      result[key].push(item);
      return result;
    }, {});
  }

  const groupedByCourse = groupBy(enrollments.flat(), ({ course }) => course);

  const revenue = publishedCourses.reduce((acc, course) => {
    const quantity = groupedByCourse[course._id]
      ? groupedByCourse[course._id].length
      : 0;
    return acc + quantity * course.price;
  }, 0);

  const testimonials = await Promise.all(
    publishedCourses.map(async ({ _id }) => {
      const testimonial = await getTestimonialForCourse(_id);
      return testimonial;
    })
  );
  if (expand) {
    const courses = await Course.find({ instructor: instructorId });
    return {
      courses,
      enrollments,
      testimonials,
      revenue,
    };
  }
  return {
    courses: publishedCourses,
    enrollments,
    testimonials,
    revenue,
  };
}

export async function create(courseData) {
  try {
    const result = await Course.create(courseData);
    return JSON.parse(JSON.stringify(result));
  } catch (error) {
    throw new Error(error);
  }
}

export async function update(courseId, courseData) {
  try {
    const course = await Course.findByIdAndUpdate(courseId, courseData);
    return JSON.parse(JSON.stringify(course));
  } catch (error) {
    throw new Error(error);
  }
}
