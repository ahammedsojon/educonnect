import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { CheckCheck } from "lucide-react";
import { Presentation } from "lucide-react";
import { UsersRound } from "lucide-react";
import { Star } from "lucide-react";
import { MessageSquare } from "lucide-react";
import { BookCheck } from "lucide-react";
import { Clock10 } from "lucide-react";
import { Radio } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Video } from "lucide-react";
import { NotepadText } from "lucide-react";
import { FileQuestion } from "lucide-react";
import { PlayCircle } from "lucide-react";
import { SquarePlay } from "lucide-react";
import { Tv } from "lucide-react";
import { StickyNote } from "lucide-react";
import { BookOpen } from "lucide-react";
import formattedTime from "@/lib/formattedTime";
import CourseOverview from "./CourseOverview";
import CourseInstructor from "./CourseInstructor";
const CourseDetails = ({ course }) => {
  const {
    title,
    description,
    category,
    instructor,
    learning,
    subtitle,
    updated_at,
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
            <img
              className="w-[40px] h-[40px] rounded-full"
              src={instructor?.profilePicture}
              alt="sumit saha"
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
              {/* each tab content can be independent component */}
              <div className="flex gap-x-5 items-center justify-center flex-wrap mt-4 mb-6 text-gray-600 text-sm">
                <span className="flex items-center gap-1.5">
                  <BookCheck className="w-4 h-4" />
                  12 Chapters
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock10 className="w-4 h-4" />
                  50+ Hours
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
                <AccordionItem className="border-none" value="item-1">
                  <AccordionTrigger>Introduction</AccordionTrigger>
                  <AccordionContent>
                    {/* header */}
                    <div className="flex gap-x-5 items-center flex-wrap mt-4 mb-6 text-gray-600 text-sm">
                      <span className="flex items-center gap-1.5">
                        <Video className="w-4 h-4" />
                        12 Lessons
                      </span>
                      <span className="flex items-center gap-1.5">
                        <NotepadText className="w-4 h-4" />
                        10 Notes
                      </span>
                      <span className="flex items-center gap-1.5">
                        <FileQuestion className="w-4 h-4" />
                        10 Quiz
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Radio className="w-4 h-4" />1 Live Class
                      </span>
                    </div>
                    {/* header ends */}

                    <div className="space-y-3">
                      {/* item */}
                      <button
                        type="button"
                        className={cn(
                          "flex items-center gap-x-2 text-slate-500 text-sm font-[500]  transition-all hover:text-slate-600  w-full"
                        )}
                      >
                        <div className="flex items-center gap-x-2">
                          <Tv size={16} className={cn("text-slate-500")} />
                          What is React ?
                        </div>
                      </button>
                      {/* item ends */}
                      {/* item */}
                      <button
                        type="button"
                        className={cn(
                          "flex items-center gap-x-2 text-slate-500 text-sm font-[500]  transition-all hover:text-slate-600  w-full"
                        )}
                      >
                        <div className="flex items-center gap-x-2">
                          <Tv size={16} className={cn("text-slate-500")} />
                          Learn React Basics
                        </div>
                      </button>
                      {/* item ends */}
                      {/* item */}
                      <button
                        type="button"
                        className={cn(
                          "flex items-center gap-x-2 text-slate-500 text-sm font-[500]  transition-all hover:text-slate-600  w-full"
                        )}
                      >
                        <div className="flex items-center gap-x-2">
                          <Tv size={16} className={cn("text-slate-500")} />
                          Build A Simple React App
                        </div>
                      </button>
                      {/* item ends */}
                      {/* item */}
                      <button
                        type="button"
                        className={cn(
                          "flex items-center gap-x-2 text-slate-500 text-sm font-[500]  transition-all hover:text-slate-600  w-full"
                        )}
                      >
                        <div className="flex items-center gap-x-2">
                          <StickyNote
                            size={16}
                            className={cn("text-slate-500")}
                          />
                          React Basic Note
                        </div>
                      </button>
                      {/* item ends */}
                      {/* item */}
                      <button
                        type="button"
                        className={cn(
                          "flex items-center gap-x-2 text-slate-500 text-sm font-[500]  transition-all hover:text-slate-600  w-full"
                        )}
                      >
                        <div className="flex items-center gap-x-2">
                          <StickyNote
                            size={16}
                            className={cn("text-slate-500")}
                          />
                          Project Requirement Analysis
                        </div>
                      </button>
                      {/* item ends */}
                    </div>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem className="border-none" value="item-2">
                  <AccordionTrigger>Master Next JS</AccordionTrigger>
                  <AccordionContent>
                    {/* header */}
                    <div className="flex gap-x-5 items-center flex-wrap mt-4 mb-6 text-gray-600 text-sm">
                      <span className="flex items-center gap-1.5">
                        <Video className="w-4 h-4" />
                        12 Lessons
                      </span>
                      <span className="flex items-center gap-1.5">
                        <NotepadText className="w-4 h-4" />
                        10 Notes
                      </span>
                      <span className="flex items-center gap-1.5">
                        <FileQuestion className="w-4 h-4" />
                        10 Quiz
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Radio className="w-4 h-4" />1 Live Class
                      </span>
                    </div>
                    {/* header ends */}

                    <div className="space-y-3">
                      {/* item */}
                      <button
                        type="button"
                        className={cn(
                          "flex items-center gap-x-2 text-slate-500 text-sm font-[500]  transition-all hover:text-slate-600  w-full"
                        )}
                      >
                        <div className="flex items-center gap-x-2">
                          <Tv size={16} className={cn("text-slate-500")} />
                          What is React ?
                        </div>
                      </button>
                      {/* item ends */}
                      {/* item */}
                      <button
                        type="button"
                        className={cn(
                          "flex items-center gap-x-2 text-slate-500 text-sm font-[500]  transition-all hover:text-slate-600  w-full"
                        )}
                      >
                        <div className="flex items-center gap-x-2">
                          <Tv size={16} className={cn("text-slate-500")} />
                          Learn React Basics
                        </div>
                      </button>
                      {/* item ends */}
                      {/* item */}
                      <button
                        type="button"
                        className={cn(
                          "flex items-center gap-x-2 text-slate-500 text-sm font-[500]  transition-all hover:text-slate-600  w-full"
                        )}
                      >
                        <div className="flex items-center gap-x-2">
                          <Tv size={16} className={cn("text-slate-500")} />
                          Build A Simple React App
                        </div>
                      </button>
                      {/* item ends */}
                      {/* item */}
                      <button
                        type="button"
                        className={cn(
                          "flex items-center gap-x-2 text-slate-500 text-sm font-[500]  transition-all hover:text-slate-600  w-full"
                        )}
                      >
                        <div className="flex items-center gap-x-2">
                          <StickyNote
                            size={16}
                            className={cn("text-slate-500")}
                          />
                          React Basic Note
                        </div>
                      </button>
                      {/* item ends */}
                      {/* item */}
                      <button
                        type="button"
                        className={cn(
                          "flex items-center gap-x-2 text-slate-500 text-sm font-[500]  transition-all hover:text-slate-600  w-full"
                        )}
                      >
                        <div className="flex items-center gap-x-2">
                          <StickyNote
                            size={16}
                            className={cn("text-slate-500")}
                          />
                          Project Requirement Analysis
                        </div>
                      </button>
                      {/* item ends */}
                    </div>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem className="border-none" value="item-3">
                  <AccordionTrigger>
                    Built Ecommerce Using Next.js
                  </AccordionTrigger>
                  <AccordionContent>
                    {/* header */}
                    <div className="flex gap-x-5 items-center flex-wrap mt-4 mb-6 text-gray-600 text-sm">
                      <span className="flex items-center gap-1.5">
                        <Video className="w-4 h-4" />
                        12 Lessons
                      </span>
                      <span className="flex items-center gap-1.5">
                        <NotepadText className="w-4 h-4" />
                        10 Notes
                      </span>
                      <span className="flex items-center gap-1.5">
                        <FileQuestion className="w-4 h-4" />
                        10 Quiz
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Radio className="w-4 h-4" />1 Live Class
                      </span>
                    </div>
                    {/* header ends */}

                    <div className="space-y-3">
                      {/* item */}
                      <button
                        type="button"
                        className={cn(
                          "flex items-center gap-x-2 text-slate-500 text-sm font-[500]  transition-all hover:text-slate-600  w-full"
                        )}
                      >
                        <div className="flex items-center gap-x-2">
                          <Tv size={16} className={cn("text-slate-500")} />
                          What is React ?
                        </div>
                      </button>
                      {/* item ends */}
                      {/* item */}
                      <button
                        type="button"
                        className={cn(
                          "flex items-center gap-x-2 text-slate-500 text-sm font-[500]  transition-all hover:text-slate-600  w-full"
                        )}
                      >
                        <div className="flex items-center gap-x-2">
                          <Tv size={16} className={cn("text-slate-500")} />
                          Learn React Basics
                        </div>
                      </button>
                      {/* item ends */}
                      {/* item */}
                      <button
                        type="button"
                        className={cn(
                          "flex items-center gap-x-2 text-slate-500 text-sm font-[500]  transition-all hover:text-slate-600  w-full"
                        )}
                      >
                        <div className="flex items-center gap-x-2">
                          <Tv size={16} className={cn("text-slate-500")} />
                          Build A Simple React App
                        </div>
                      </button>
                      {/* item ends */}
                      {/* item */}
                      <button
                        type="button"
                        className={cn(
                          "flex items-center gap-x-2 text-slate-500 text-sm font-[500]  transition-all hover:text-slate-600  w-full"
                        )}
                      >
                        <div className="flex items-center gap-x-2">
                          <StickyNote
                            size={16}
                            className={cn("text-slate-500")}
                          />
                          React Basic Note
                        </div>
                      </button>
                      {/* item ends */}
                      {/* item */}
                      <button
                        type="button"
                        className={cn(
                          "flex items-center gap-x-2 text-slate-500 text-sm font-[500]  transition-all hover:text-slate-600  w-full"
                        )}
                      >
                        <div className="flex items-center gap-x-2">
                          <StickyNote
                            size={16}
                            className={cn("text-slate-500")}
                          />
                          Project Requirement Analysis
                        </div>
                      </button>
                      {/* item ends */}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
              {/* contents end */}
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
