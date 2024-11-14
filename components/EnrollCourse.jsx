"use client";

import { Button } from "./ui/button";
import { ArrowRight } from "lucide-react";
import { createCheckoutSession } from "@/app/actions/stripe";

const EnrollCourse = ({ asLink, course }) => {
  const formAction = async (formData) => {
    const { url } = await createCheckoutSession(formData);
    window.location.assign(url);
  };
  return (
    <form action={formAction}>
      <input type="hidden" name="courseId" value={course?.id} />
      <input type="hidden" name="courseName" value={course?.title} />
      <input type="hidden" name="coursePrice" value={course?.price} />
      {asLink ? (
        <Button type="submit" className={cn(buttonVariants({ size: "lg" }))}>
          Enroll Now
        </Button>
      ) : (
        <Button
          type="submit"
          variant="ghost"
          className="text-xs text-sky-700 h-7 gap-1"
        >
          Enroll
          <ArrowRight className="w-3" />
        </Button>
      )}
    </form>
  );
};

export default EnrollCourse;
