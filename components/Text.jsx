"use client";
import { Button } from "./ui/button";
import { toast } from "sonner";

const Text = () => {
  const handleClick = (mode) => {
    mode ? toast.success("Test success") : toast.error("Test error");
  };
  return (
    <Button variant="link" onClick={() => handleClick(true)}>
      Click me
    </Button>
  );
};

export default Text;
