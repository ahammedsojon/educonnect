"use server";

import { getLoggedInUser } from "@/lib/getLoggedInUser";
import { create, update } from "@/queries/courses";

export const createCourse = async (formData) => {
  try {
    const loggedInUser = await getLoggedInUser();
    formData["instructor"] = loggedInUser?.id;
    const result = await create(formData);
    return result;
  } catch (error) {
    throw new Error(error);
  }
};

export const updateCourse = async (courseId, formData) => {
  try {
    const result = await update(courseId, formData);
    return result;
  } catch (error) {
    throw new Error(error);
  }
};
