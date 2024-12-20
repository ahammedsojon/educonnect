import { getCourseDetailsByInstructor } from "@/queries/courses";
import { MessageSquare, Presentation, Star, UsersRound } from "lucide-react";
import Image from "next/image";
import React from "react";

const CourseInstructor = async ({ instructor }) => {
  const { courses, enrollments, testimonials } =
    (await getCourseDetailsByInstructor(instructor._id)) || {};
  const totalEnrollments = enrollments.flat().length;
  const totalReviews = testimonials.flat().length;
  const totalRatings = (
    testimonials.flat().reduce((acc, review) => acc + review.rating, 0) / 3
  ).toPrecision(2);

  return (
    <div className="bg-gray-50 rounded-md p-8">
      <div className="md:flex md:gap-x-5 mb-8">
        <div className="h-[310px] w-[270px] max-w-full  flex-none rounded mb-5 md:mb-0">
          <Image
            src={instructor?.profilePicture}
            alt={instructor.firstName}
            className="w-full h-full object-cover rounded"
            height={310}
            width={270}
          />
        </div>
        <div className="flex-1">
          <div className="max-w-[300px]">
            <h4 className="text-[34px] font-bold leading-[51px]">
              {instructor?.firstName} {instructor.lastName}
            </h4>
            <div className="text-gray-600 font-medium mb-6">
              {instructor?.designation}
            </div>
            <ul className="list space-y-4">
              <li className="flex items-center space-x-3">
                <Presentation className="text-gray-600" />
                <div>{courses?.length} Courses</div>
              </li>
              <li className="flex space-x-3">
                <UsersRound className="text-gray-600" />
                <div>{totalEnrollments} Student Learned</div>
              </li>
              <li className="flex space-x-3">
                <MessageSquare className="text-gray-600" />
                <div>{totalReviews} Reviews</div>
              </li>
              <li className="flex space-x-3">
                <Star className="text-gray-600" />
                <div>{totalRatings} Average Rating</div>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <p className="text-gray-600">{instructor?.bio}</p>
    </div>
  );
};

export default CourseInstructor;
