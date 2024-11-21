import { replaceMongoIdInObject } from "@/lib/convertData";
import { Course } from "@/model/course";
import { Module } from "@/model/module";

export async function create(formData) {
  try {
    const title = formData.get("title");
    const slug = formData.get("slug");
    const course = formData.get("course");
    const order = formData.get("order");

    const createdModule = await Module.create({ title, slug, course, order });
    const courseByModule = await Course.findById(course);
    courseByModule.modules.push(createdModule);
    courseByModule.save();
    return JSON.parse(JSON.stringify(createdModule));
  } catch (error) {
    console.log(error.message);
  }
}

export async function getModuleById(id) {
  try {
    const result = await Module.findById(id).lean();
    return replaceMongoIdInObject(result);
  } catch (error) {
    console.log(error.message);
  }
}

export async function update(moduleId, data) {
  try {
    const result = await Module.findByIdAndUpdate(moduleId, data);
    return JSON.parse(JSON.stringify(result));
  } catch (error) {
    throw new Error(error);
  }
}

export async function reorder(data) {
  try {
    await Promise.all(
      data.map(async (element) =>
        Module.findByIdAndUpdate(element.id, { order: element.position })
      )
    );
  } catch (error) {
    console.log(error.message);
  }
}
