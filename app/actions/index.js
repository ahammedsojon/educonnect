"use server";

import { signIn } from "@/auth";
import { dbConnect } from "@/service/mongo";

export const credentialLogin = async (formData) => {
  try {
    await dbConnect();
    const response = await signIn("credentials", {
      email: formData.get("email"),
      password: formData.get("password"),
      redirect: false,
    });
    return response;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

export async function doSocialLogin(formData) {
  const action = formData.get("action");
  await signIn(action, { redirectTo: "/courses" });
}
