import { replaceMongoIdInObject } from "@/lib/convertData";
import { User } from "@/model/user";

export async function getUserByEmail(email) {
  const response = await User.findOne({ email }).lean();
  return replaceMongoIdInObject(response);
}
