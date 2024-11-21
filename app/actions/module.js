"use server";

import { create, reorder } from "@/queries/module";

export async function createModule(formData) {
  try {
    const result = await create(formData);
    return result;
  } catch (error) {
    throw new Error(error);
  }
}

export async function reorderModules(data) {
  try {
    const result = await reorder(data);
    return result;
  } catch (error) {
    throw new Error(error);
  }
}
