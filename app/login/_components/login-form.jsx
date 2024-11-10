"use client";

import Link from "next/link";

import { credentialLogin } from "@/app/actions";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function LoginForm() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const formData = new FormData(e.currentTarget);
      const response = await credentialLogin(formData);
      if (response.error) {
        return setError(response.error.message);
      }

      router.push("/courses");
    } catch (error) {
      setLoading(false);
      console.log(error);
      setError(error.message);
    }
  };
  return (
    <Card className="mx-auto max-w-sm w-full">
      <form onSubmit={handleSubmit}>
        <CardHeader>
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                name="email"
                placeholder="m@example.com"
                required
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
                {/* <Link href="#" className="ml-auto inline-block text-sm underline">
                Forgot your password?
              </Link> */}
              </div>
              <Input id="password" name="password" type="password" required />
            </div>
            {error && <div className="text-red-700 my-2">{error}</div>}
            {!loading ? (
              <Button type="submit" className="w-full">
                Login
              </Button>
            ) : (
              <Button type="button" className="w-full" disabled>
                Loading...
              </Button>
            )}
          </div>
          <div className="mt-4 text-center text-sm">
            Don&apos;t have an account? <br />
            Register as
            <Link href="/register/student" className="underline ms-2">
              Student
            </Link>
            <span className="mx-2">or</span>
            <Link href="/register/instructor" className="underline">
              Instructor
            </Link>
          </div>
        </CardContent>
      </form>
    </Card>
  );
}
