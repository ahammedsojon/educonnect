import { replaceMongoIdInArray } from "@/lib/convertData";
import { Category } from "@/model/category";
import { Module } from "@/model/module";
import { Testimonial } from "@/model/testimonial";
import { User } from "@/model/user";

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
  console.log(result);

  return replaceMongoIdInArray(result);
}
