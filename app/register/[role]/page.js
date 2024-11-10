import { SignupForm } from "../_components/signup-form";

export default async function RegisterPage({ params: { role } }) {
  return <SignupForm role={role} />;
}
