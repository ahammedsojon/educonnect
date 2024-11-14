import {
  replaceMongoIdInArray,
  replaceMongoIdInObject,
} from "@/lib/convertData";
import { Enrollment } from "@/model/enrollement";

export async function getEnrollmentForCourse(courseId) {
  const enrollements = await Enrollment.find({ course: courseId }).lean();

  return replaceMongoIdInArray(enrollements);
}

export async function enrollForCourse(courseId, userId, paymentMethod) {
  const enrollmentInfo = {
    enrollmentDate: Date.now(),
    status: "not-started",
    user: userId,
    course: courseId,
    method: paymentMethod,
  };
  try {
    const response = await Enrollment.create(enrollmentInfo);
    return response;
  } catch (error) {
    throw new Error(error);
  }
}
