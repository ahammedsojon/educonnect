import { ENROLLMENT_DATA, getInsturctorDashboardData } from "@/lib/dashboard";
import { columns } from "./_components/columns";
import { DataTable } from "./_components/data-table";

// const enrollments = [
//   {
//     id: 1,
//     date: "10 Nov 2022",
//     student: {
//       name: "John Doe",
//       email: "Dp5kz@example.com",
//       progress: "10%",
//       quizMark: 80,
//     },
//   },
//   {
//     id: 1,
//     date: "10 Nov 2022",
//     student: {
//       name: "John Smilga",
//       email: "johnsmilga@gmail.com",
//       progress: "80%",
//       quizMark: 50,
//     },
//   },
// ];
const EnrollmentsPage = async ({ params: { courseId } }) => {
  const data = await getInsturctorDashboardData(ENROLLMENT_DATA);
  console.log(data);

  const enrollments = JSON.parse(
    JSON.stringify(data.filter((en) => en?.course?._id.toString() === courseId))
  );
  return (
    <div className="p-6">
      {/* <Link href="/teacher/create">
        <Button>New Course</Button>
      </Link> */}
      <h2>Think in a Redux way enrollments</h2>
      <DataTable columns={columns} data={enrollments} />
    </div>
  );
};

export default EnrollmentsPage;
