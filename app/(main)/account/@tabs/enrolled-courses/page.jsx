// import { CourseProgress } from "@/components/course-progress";
import { Badge } from "@/components/ui/badge";
import { getLoggedInUser } from "@/lib/getLoggedInUser";
import { getEnrollmentsForUser } from "@/queries/enrollments";
import { BookOpen } from "lucide-react";
import Image from "next/image";
import EnrolledCourseCard from "../../component/EnrolledCourseCard";
import Link from "next/link";

async function EnrolledCourses() {
  const loggedInUser = await getLoggedInUser();
  const enrollments = await getEnrollmentsForUser(loggedInUser?.id);

  return (
    <div className="grid sm:grid-cols-2 gap-6">
      {enrollments && enrollments.length > 0 ? (
        enrollments.map((enrollment) => (
          <EnrolledCourseCard key={enrollment.id} enrollment={enrollment} />
        ))
      ) : (
        <>
          <p className="text-center">No Enrollments Found!</p>
          <br />
          <Link
            href={"/courses"}
            className="underline text-blue-500 block text-center"
          >
            Explore Courses
          </Link>
        </>
      )}
    </div>
  );
}

export default EnrolledCourses;
