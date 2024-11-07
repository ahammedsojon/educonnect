import { replaceMongoIdInArray } from "@/lib/convertData";
import { Lesson } from "@/model/lesson";

export async function getLessons(lessondIds) {
  const lessons = await Promise.all(
    lessondIds.map(async (id) => {
      const lesson = await Lesson.findById(id).lean();
      return lesson;
    })
  );
  console.log(lessons);
  return replaceMongoIdInArray(lessons);
}
