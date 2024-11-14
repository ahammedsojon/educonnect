"use client";

import { userInfoUpdate } from "@/app/actions/account";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import React, { useState } from "react";
import { toast } from "sonner";

const PersonalDetails = ({ userInfo }) => {
  const [userState, setUserState] = useState({
    firstName: userInfo?.firstName,
    lastName: userInfo?.lastName,
    designation: userInfo?.designation,
    bio: userInfo?.bio,
  });
  const handleChange = (e) => {
    const field = e.target.name;
    const value = e.target.value;
    setUserState({ ...userState, [field]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await userInfoUpdate(userInfo?.email, userState);
      toast.success("User info has been updated.");
    } catch (error) {
      console.log(error.message);
      toast.error(error.message);
    }
  };
  return (
    <div className="p-6 rounded-md shadow dark:shadow-gray-800 bg-white dark:bg-slate-900">
      <h5 className="text-lg font-semibold mb-4">Personal Detail :</h5>
      <form onSubmit={handleSubmit}>
        <div className="grid lg:grid-cols-2 grid-cols-1 gap-5">
          <div>
            <Label className="mb-2 block">
              First Name : <span className="text-red-600">*</span>
            </Label>
            <Input
              type="text"
              placeholder="First Name:"
              id="firstName"
              name="firstName"
              required
              value={userState?.firstName}
              onChange={handleChange}
            />
          </div>
          <div>
            <Label className="mb-2 block">
              Last Name : <span className="text-red-600">*</span>
            </Label>
            <Input
              type="text"
              placeholder="Last Name:"
              id="lastName"
              name="lastName"
              required
              value={userState?.lastName}
              onChange={handleChange}
            />
          </div>
          <div>
            <Label className="mb-2 block">
              Your Email : <span className="text-red-600">*</span>
            </Label>
            <Input
              type="email"
              placeholder="Email"
              name="email"
              value={userInfo?.email}
              required
              disabled
            />
          </div>
          <div>
            <Label className="mb-2 block">Occupation :</Label>
            <Input
              name="designation"
              id="designation"
              type="text"
              placeholder="Occupation :"
              value={userState?.designation}
              onChange={handleChange}
            />
          </div>
        </div>
        {/*end grid*/}
        <div className="grid grid-cols-1">
          <div className="mt-5">
            <Label className="mb-2 block">Description :</Label>
            <Textarea
              id="bio"
              name="bio"
              placeholder="Message :"
              value={userState?.bio}
              onChange={handleChange}
            />
          </div>
        </div>
        {/*end row*/}
        <Button className="mt-5 cursor-pointer" asChild>
          <input type="submit" name="send" value="Save Changes" />
        </Button>
      </form>
      {/*end form*/}
    </div>
  );
};

export default PersonalDetails;
