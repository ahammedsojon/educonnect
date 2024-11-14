"use server";

import { User } from "@/model/user";
import { revalidatePath } from "next/cache";

export async function userInfoUpdate(email, data) {
  try {
    await User.findOneAndUpdate({ email }, data);
    revalidatePath("/account");
  } catch (error) {
    throw new Error(error);
  }
}

export async function contactInfoUpdate(email, data) {
  try {
    const { phone, socialMedia } = data;
    if (Object.keys(socialMedia).length > 0) {
    }
    await User.findOneAndUpdate({ email }, data);
    revalidatePath("/account");
  } catch (error) {
    throw new Error(error);
  }
}
