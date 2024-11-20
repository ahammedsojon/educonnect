import { COURSE_DATA, getInsturctorDashboardData } from "@/lib/dashboard";
import { columns } from "./_components/columns";
import { DataTable } from "./_components/data-table";
const CoursesPage = async () => {
  const data = await getInsturctorDashboardData(COURSE_DATA);
  const courses = JSON.parse(JSON.stringify(data));

  return (
    <div className="p-6">
      {/* <Link href="/teacher/create">
        <Button>New Course</Button>
      </Link> */}
      <DataTable columns={columns} data={courses} />
    </div>
  );
};

export default CoursesPage;
