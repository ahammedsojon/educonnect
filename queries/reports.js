import { replaceMongoIdInObject } from "@/lib/convertData";
import { Assessment } from "@/model/assessment";
import { Report } from "@/model/report";

export async function getAReport(filter) {
  console.log({ filter });

  try {
    const report = await Report.findOne(filter)
      .populate({
        path: "quizAssessment",
        model: Assessment,
      })
      .lean();
    return replaceMongoIdInObject(report);
  } catch (error) {
    throw new Error(error);
  }
}
