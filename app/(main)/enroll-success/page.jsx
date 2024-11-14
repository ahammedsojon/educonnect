import { auth } from "@/auth";
import { Button } from "@/components/ui/button";
import { stripe } from "@/lib/stripe";
import { getCourseById } from "@/queries/courses";
import { CircleCheck } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";

const Success = async ({ searchParams: { session_id, courseId } }) => {
  if (!session_id) {
    throw new Error("Please provide a valid session id that starts with cs_");
  }
  const userSession = await auth();
  if (!userSession?.user?.email) {
    redirect("/login");
  }

  const courseDetails = await getCourseById(courseId);
  const loggedinUser = await getUserByEmail(userSession?.user?.email);
  const customerName = `${loggedinUser?.firstName} ${loggedinUser?.lastName}`;
  const customerEmail = loggedinUser.email;
  const productName = courseDetails?.title;

  const checkoutSession = await stripe.checkout.sessions.retrieve(session_id, {
    expand: ["line_items", "payment_intent"],
  });
  const paymentIntent = checkoutSession.payment_intent;
  const paymentStatus = paymentIntent.status;
  if (paymentStatus === "succeeded") {
    try {
      const enrolled = await enrollForCourse(
        courseId,
        loggedinUser?.id,
        "stripe"
      );
      const instructorName = `${courseDetails?.instructor?.firstName} ${courseDetails?.instructor?.lastName}`;
      const instructorEmail = courseDetails?.instructor?.email;
      const emailToSend = [
        {
          to: instructorEmail,
          subject: `New Enrollment for ${productName}.`,
          message: `Congratulations, ${instructorName}. A new student, ${customerName} has enrolled to your course ${productName} just now. Please check the instructor dashboard and give a high-five to your new student.`,
        },
        {
          to: customerEmail,
          subject: `Enrollment Success for ${productName}`,
          message: `Hey ${customerName} You have successfully enrolled for the course ${productName}`,
        },
      ];
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div className="h-full w-full flex-1 flex flex-col items-center justify-center">
      <div className="flex flex-col items-center gap-6 max-w-[600px] text-center">
        <CircleCheck className="w-32 h-32 bg-success rounded-full p-0 text-white" />
        <h1 className="text-xl md:text-2xl lg:text-3xl">
          Congratulations! You Enrollment was Successful
        </h1>
        <div className="flex items-center gap-3">
          <Button asChild size="sm">
            <Link href="/courses">Browse Courses</Link>
          </Button>
          <Button asChild variant="outline" size="sm">
            <Link href="/think-in-a-redux-way/introduction">Play Course</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};
export default Success;
