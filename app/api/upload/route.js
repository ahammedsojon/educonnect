import { updateCourse } from "@/app/actions/course";
import fs from "fs";
import { NextResponse } from "next/server";
import { pipeline } from "stream";
import { promisify } from "util";

const pump = promisify(pipeline);

export async function POST(request, response) {
  try {
    const formData = await request.formData();
    const file = formData.get("files");
    const destination = formData.get("destination");
    const courseId = formData.get("courseId");
    console.log(file);
    console.log(destination);
    console.log(courseId);

    if (!destination) {
      return new NextResponse("Please provide a file destination", {
        status: 500,
      });
    }
    const filePath = `${destination}/${file.name}`;
    await pump(file.stream(), fs.createWriteStream(filePath));
    await updateCourse(courseId, { thumbnail: file.name });
    return new NextResponse(
      `File ${file.name} has been updated successfully.`,
      {
        status: 201,
      }
    );
  } catch (error) {
    console.log(error.message);

    return new NextResponse(error.message, {
      status: 500,
    });
  }
}
