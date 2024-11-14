"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React, { useState } from "react";
import { toast } from "sonner";

const ContactInfo = ({ userInfo }) => {
  const [userState, setUserState] = useState({
    phone: userInfo?.phone,
    socialMedia: {
      website: userInfo?.socialMedia?.website,
    },
  });
  const handleChange = (e) => {
    const field = e.target.name;
    const value = e.target.value;
    if (field === "phone") {
      setUserState({ ...userState, [field]: value });
    } else {
      userState({
        ...userState,
        socialMedia: {
          ...userState.socialMedia,
          [field]: value,
        },
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await contactInfoUpdate(userInfo?.email, userState);
      toast.success("Contact info updated successfully.");
    } catch (error) {
      console.log(error.message);
      toast.error(error.message);
    }
  };
  return (
    <div>
      <h5 className="text-lg font-semibold mb-4">Contact Info :</h5>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 gap-5">
          <div>
            <Label className="mb-2 block">Phone No. :</Label>
            <Input
              name="number"
              id="phone"
              type="phone"
              placeholder="Phone :"
              value={userState?.phone}
              onChange={handleChange}
            />
          </div>
          <div>
            <Label className="mb-2 block">Website :</Label>
            <Input
              name="url"
              id="website"
              type="website"
              placeholder="Url :"
              value={useState?.socialMedia?.website}
              onChange={handleChange}
            />
          </div>
        </div>
        {/*end grid*/}
        <Button className="mt-5 cursor-pointer" type="submit">
          Add
        </Button>
      </form>
    </div>
  );
};

export default ContactInfo;
