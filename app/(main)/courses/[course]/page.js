import CourseIntro from "./_components/CourseIntro";
import CourseDetails from "./_components/CourseDetails";
import CourseTestimonials from "./_components/CourseTestimonials";
import RelatedCourses from "./RelatedCourses";
import { getCourseById } from "@/queries/courses";

const SingleCoursePage = async ({ params: { course: courseId } }) => {
  console.log(courseId);

  const course = await getCourseById(courseId);
  console.log(course);

  return (
    <>
      <CourseIntro
        title={course?.title}
        subtitle={course?.subtitle}
        thumbnail={course?.thumbnail}
      />

      <CourseDetails course={course} />

      {/* Testimonials */}
      <CourseTestimonials testimonials={course?.testimonials} />
      {/* Releated Course */}
      {/* <RelatedCourses course={course} /> */}
      {/* Authors */}
      {/* https://avatars.githubusercontent.com/u/1416832?v=4 */}
      {/* https://avatars.githubusercontent.com/u/3633137?v=4 */}
    </>
  );
};
export default SingleCoursePage;
