import Text from "@/components/Text";
import { getCourses } from "@/queries/courses";

export default async function Home() {
  const courses = await getCourses();
  console.log(courses);

  return (
    <div>
      <Text />
    </div>
  );
}
