"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { formatPrice } from "@/lib/formatPrice";
import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";
import { BookOpen } from "lucide-react";
import { ChevronDown } from "lucide-react";
import { MessageSquareText } from "lucide-react";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import SearchCourse from "./_components/SearchCourse";
import SortCourse from "./_components/SortCourse";
import FilterMenuMobile from "./_components/FilterMenuMobile";
import ActiveFilters from "./_components/ActiveFilters";
import FilterCourse from "./_components/FilterCourse";
import CourseCard from "./_components/CourseCard";
import { Course } from "@/model/course";
import { Corben } from "next/font/google";
import { getCourseList } from "@/queries/courses";

const SIZE_FILTERS = {
  id: "size",
  name: "Size",
  options: [
    { value: "S", label: "S" },
    { value: "M", label: "M" },
    { value: "L", label: "L" },
  ],
};
const CoursesPage = async () => {
  const courses = await getCourseList();

  const [filter, setFilter] = useState({
    categories: ["development"],
    price: ["free"],
    sort: "",
  });

  //   apply checkbox filter
  const applyArrayFilter = ({ type, value }) => {
    const isFilterApplied = filter[type].includes(value);

    if (isFilterApplied) {
      setFilter((prev) => ({
        ...prev,
        [type]: prev[type].filter((v) => v !== value),
      }));
    } else {
      setFilter((prev) => ({
        ...prev,
        [type]: [...prev[type], value],
      }));
    }
  };

  return (
    <section
      id="courses"
      className="container space-y-6   dark:bg-transparent py-6"
    >
      {/* <h2 className="text-xl md:text-2xl font-medium">All Courses</h2> */}
      {/* header */}
      <div className="flex items-baseline justify-between  border-gray-200 border-b pb-6 flex-col gap-4 lg:flex-row">
        <SearchCourse />

        <div className="flex items-center justify-end gap-2 max-lg:w-full">
          <SortCourse />

          {/* Filter Menus For Mobile */}

          <div className="lg:hidden">
            <FilterMenuMobile
              filter={filter}
              applyArrayFilter={applyArrayFilter}
            />
          </div>
        </div>
      </div>
      {/* header ends */}
      {/* active filters */}
      <ActiveFilters filter={filter} applyArrayFilter={applyArrayFilter} />
      <section className="pb-24 pt-6">
        <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
          {/* Filters */}
          {/* these component can be re use for mobile also */}
          <div className="hidden lg:block">
            <FilterCourse filter={filter} applyArrayFilter={applyArrayFilter} />
          </div>
          {/* Course grid */}
          <div className="lg:col-span-3 grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4">
            {courses.map((course) => {
              return <CourseCard key={course.id} course={course} />;
            })}
          </div>
        </div>
      </section>
    </section>
  );
};
export default CoursesPage;
