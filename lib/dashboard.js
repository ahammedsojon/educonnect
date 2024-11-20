import { getCourseDetailsByInstructor } from "@/queries/courses";
import { getLoggedInUser } from "./getLoggedInUser";
import { getUserById } from "@/queries/users";

export const COURSE_DATA = "cousres";
export const ENROLLMENT_DATA = "enrollments";
export const REVIEW_DATA = "reviews";

const pouplateReviewData = async (reviews) => {
  const data = await Promise.all(
    reviews.map(async (review) => {
      const student = await getUserById(review?.user?._id);
      review["studentName"] = `${student.firstName} ${student.lastName}`;
      return review;
    })
  );
  return data;
};

const populateEnrollmentData = async (enrollments) => {
  console.log(enrollments);

  const data = await Promise.all(
    enrollments.map(async (enroll) => {
      const student = await getUserById(enroll?.student?._id);
      enroll["studentName"] = `${student.firstName} ${student.lastName}`;
      enroll["studentEmail"] = student.email;
      return enroll;
    })
  );
  return data;
};

export async function getInsturctorDashboardData(dataType) {
  try {
    const instructor = await getLoggedInUser();
    const data = await getCourseDetailsByInstructor(instructor?.id);

    switch (dataType) {
      case COURSE_DATA:
        return data?.courses;
      case ENROLLMENT_DATA:
        return populateEnrollmentData(data?.enrollments.flat());
      case REVIEW_DATA:
        return pouplateReviewData(data?.testimonials.flat());

      default:
        return data;
    }
  } catch (error) {
    console.log(error);

    throw new Error(error);
  }
}
