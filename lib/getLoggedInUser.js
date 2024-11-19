import { auth } from "@/auth";
import { getUserByEmail } from "@/queries/users";
import { redirect } from "next/navigation";

export async function getLoggedInUser() {
  const session = await auth();
  if (!session) redirect("/login");
  const loggedInUser = await getUserByEmail(session?.user?.email);
  return loggedInUser;
}
