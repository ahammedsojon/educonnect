import {
  replaceMongoIdInArray,
  replaceMongoIdInObject,
} from "@/lib/convertData";
import { Category } from "@/model/category";

export async function getCategoreis() {
  const result = await Category.find({}).lean();
  return replaceMongoIdInArray(result);
}

export async function getCategoryById(categoryId) {
  const category = await Category.findById(categoryId).lean();
  console.log(category);

  return replaceMongoIdInObject(category);
}
