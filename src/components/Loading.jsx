import React from "react";
import { cva } from "class-variance-authority";

const loadingVariants = cva(
  "border-4 rounded-full border-[#eb5e28] border-t-transparent animate-spin duration-[800ms]",
  {
    variants: {
      size: {
        sm: "size-6 border-4",
        md: "size-8 border-4",
        lg: "size-10 border-5",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
);

function Loading({ size, className }) {
  return (
    <div className="flex justify-center items-center">
      <div className={loadingVariants({ size, className })} />
    </div>
  );
}

export default Loading;
