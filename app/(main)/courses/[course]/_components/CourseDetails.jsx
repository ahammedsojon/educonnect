import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import formattedTime from "@/lib/formattedTime";
import CourseOverview from "./CourseOverview";
import CourseInstructor from "./CourseInstructor";
import CourseCurriculam from "./CourseCurriculam";
import Image from "next/image";
const CourseDetails = ({ course }) => {
  const {
    title,
    description,
    category,
    instructor,
    learning,
    subtitle,
    updated_at,
    modules,
  } = course || {};
  return (
    <section className="py-8 md:py-12 lg:py-24">
      <div className="container">
        <span className="bg-success px-4 py-0.5 rounded-full text-xs font-medium text-white inline-block">
          {category?.title}
        </span>
        <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold 2xl:text-5xl mt-3">
          {title}
        </h3>
        <p className="mt-3 text-gray-600 text-sm">{subtitle}</p>
        {/*  */}
        <div className="flex sm:items-center gap-5 flex-col sm:flex-row sm:gap-6 md:gap-20 mt-6">
          <div className="flex items-center gap-2">
            <Image
              className="w-[40px] h-[40px] rounded-full"
              src={instructor?.profilePicture}
              alt="sumit saha"
              height={40}
              width={40}
            />
            <p className="font-bold">
              {instructor?.firstName} {instructor?.lastName}
            </p>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <span className="text-success font-semibold">Last Updated: </span>
            <span>{formattedTime(updated_at)}</span>
          </div>
        </div>

        {/* Tab */}
        <div className="my-6">
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="grid w-full grid-cols-3 my-6 max-w-[768px]">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="curriculum">Carriculum</TabsTrigger>
              <TabsTrigger value="instructor">Instructor</TabsTrigger>
              {/* <TabsTrigger value="reviews">Reviews</TabsTrigger> */}
            </TabsList>
            <TabsContent value="overview">
              {/* each tab content can be independent component */}
              <CourseOverview description={description} learning={learning} />
            </TabsContent>
            <TabsContent value="curriculum">
              <CourseCurriculam modules={modules} />
            </TabsContent>
            <TabsContent value="instructor">
              {/* each tab content can be independent component */}
              <CourseInstructor instructor={instructor} />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </section>
  );
};

export default CourseDetails;
