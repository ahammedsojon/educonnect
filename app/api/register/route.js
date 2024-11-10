import { User } from "@/model/user";
import { dbConnect } from "@/service/mongo";
import bcrypt from "bcryptjs/dist/bcrypt";
import { NextResponse } from "next/server";

export async function POST(request) {
  console.log(33);

  try {
    const { firstName, lastName, email, password, role } = await request.json();
    await dbConnect();
    const hashedPassword = await bcrypt.hash(password, 5);
    const newUser = {
      firstName,
      lastName,
      email,
      password: hashedPassword,
      role,
    };
    await User.create(newUser);
    return new NextResponse("User has been created!", {
      status: 201,
    });
  } catch (error) {
    console.log(error.message);
    return new NextResponse(error.message, {
      status: 500,
    });
  }
}
