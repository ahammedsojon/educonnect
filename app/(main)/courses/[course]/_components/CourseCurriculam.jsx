import { BookCheck } from "lucide-react";
import { Clock10 } from "lucide-react";
import { Radio } from "lucide-react";
import { Accordion } from "@/components/ui/accordion";
import { Tv } from "lucide-react";
import CourseModuleList from "./CourseModuleList";

const CourseCurriculam = ({ modules }) => {
  const duration = modules.reduce((acc, { duration }) => acc + duration, 0);
  console.log(duration);

  return (
    <>
      {/* each tab content can be independent component */}
      <div className="flex gap-x-5 items-center justify-center flex-wrap mt-4 mb-6 text-gray-600 text-sm">
        <span className="flex items-center gap-1.5">
          <BookCheck className="w-4 h-4" />
          {modules.length} Chapters
        </span>
        <span className="flex items-center gap-1.5">
          <Clock10 className="w-4 h-4" />
          {(duration / 60).toPrecision()} Hours
        </span>
        <span className="flex items-center gap-1.5">
          <Radio className="w-4 h-4" />4 Live Class
        </span>
      </div>

      {/* contents */}
      <Accordion
        defaultValue={["item-1", "item-2", "item-3"]}
        type="multiple"
        collapsible
        className="w-full"
      >
        {modules.map((module) => (
          <CourseModuleList key={module._id} module={module} />
        ))}
      </Accordion>
      {/* contents end */}
    </>
  );
};

export default CourseCurriculam;
