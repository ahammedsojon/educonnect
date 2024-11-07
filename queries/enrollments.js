import { replaceMongoIdInArray } from "@/lib/convertData";
import { Enrollment } from "@/model/enrollement";

export async function getEnrollmentForCourse(courseId) {
  const enrollements = await Enrollment.find({ course: courseId }).lean();

  return replaceMongoIdInArray(enrollements);
}
