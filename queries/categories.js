import { replaceMongoIdInArray } from "@/lib/convertData";
import { Category } from "@/model/category";

export async function getCategoreis() {
  const result = await Category.find({}).lean();
  return replaceMongoIdInArray(result);
}
