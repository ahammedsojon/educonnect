import { cn } from "@/lib/utils";
import { Tv } from "lucide-react";
import React from "react";

const CourseLessonList = ({ lesson }) => {
  return (
    <button
      type="button"
      className={cn(
        "flex items-center gap-x-2 text-slate-500 text-sm font-[500]  transition-all hover:text-slate-600  w-full"
      )}
    >
      <div className="flex items-center gap-x-2">
        <Tv size={16} className={cn("text-slate-500")} />
        {lesson?.title}
      </div>
    </button>
  );
};

export default CourseLessonList;
