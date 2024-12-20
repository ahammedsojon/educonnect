import { Badge } from "@/components/ui/badge";
import { getLoggedInUser } from "@/lib/getLoggedInUser";
import { getCategoryById } from "@/queries/categories";
import { getAReport } from "@/queries/reports";
import { BookOpen } from "lucide-react";
import Image from "next/image";

const EnrolledCourseCard = async ({ enrollment }) => {
  const courseCategory = await getCategoryById(
    enrollment?.course?.category?._id
  );
  const filter = {
    student: enrollment?.student?._id,
    course: enrollment?.course?._id,
  };
  const report = await getAReport(filter);
  const quizzes = report?.quizAssessment?.assessments;
  const quizTaken = quizzes.filter((quiz) => quiz.attempted);
  const totalCorrect = quizTaken
    .map((quiz) => {
      const options = quiz.options;
      return options.filter((o) => o.isCorrect && o.isSelected);
    })
    .filter((item) => item.length > 0)
    .flat();
  const quizMarks = totalCorrect.length * 5;
  const otherMarks = report?.quizAssessment?.otherMarks;
  const totalMarks = quizMarks + otherMarks;

  return (
    <div className="group hover:shadow-sm transition overflow-hidden border rounded-lg p-3 h-full">
      <div className="relative w-full aspect-video rounded-md overflow-hidden">
        <Image
          src={`/assets/images/courses/${enrollment?.course?.thumbnail}`}
          alt={"course"}
          className="object-cover"
          fill
        />
      </div>
      <div className="flex flex-col pt-2">
        <div className="text-lg md:text-base font-medium group-hover:text-sky-700 line-clamp-2">
          {enrollment?.course?.title}
        </div>
        <p className="text-xs text-muted-foreground">{courseCategory?.title}</p>
        <div className="my-3 flex items-center gap-x-2 text-sm md:text-xs">
          <div className="flex items-center gap-x-1 text-slate-500">
            <div>
              <BookOpen className="w-4" />
            </div>
            <span>{enrollment?.course?.modules?.length} Chapters</span>
          </div>
        </div>
        <div className=" border-b pb-2 mb-2">
          <div className="flex items-center justify-between">
            <p className="text-md md:text-sm font-medium text-slate-700">
              Total Modules: {enrollment?.course?.modules?.length}
            </p>
            <p className="text-md md:text-sm font-medium text-slate-700">
              Completed Modules{" "}
              <Badge variant="success">
                {report?.totalCompletedLessons?.length}
              </Badge>
            </p>
          </div>
          <div className="flex items-center justify-between mt-2">
            <p className="text-md md:text-sm font-medium text-slate-700">
              Total Quizzes: {quizzes.length}
            </p>

            <p className="text-md md:text-sm font-medium text-slate-700">
              Quiz taken <Badge variant="success">{quizTaken.length}</Badge>
            </p>
          </div>
          <div className="flex items-center justify-between mt-2">
            <p className="text-md md:text-sm font-medium text-slate-700">
              Mark from Quizzes
            </p>

            <p className="text-md md:text-sm font-medium text-slate-700">
              {quizMarks}
            </p>
          </div>
          <div className="flex items-center justify-between mt-2">
            <p className="text-md md:text-sm font-medium text-slate-700">
              Others
            </p>

            <p className="text-md md:text-sm font-medium text-slate-700">
              {otherMarks}
            </p>
          </div>
        </div>
        <div className="flex items-center justify-between mb-4">
          <p className="text-md md:text-sm font-medium text-slate-700">
            Total Marks
          </p>

          <p className="text-md md:text-sm font-medium text-slate-700">
            {totalMarks}
          </p>
        </div>

        {/* <CourseProgress
                  size="sm"
                  value={80}
                  variant={110 === 100 ? "success" : ""}
              /> */}
      </div>
    </div>
  );
};

export default EnrolledCourseCard;
