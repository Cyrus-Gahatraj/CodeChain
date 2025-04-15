import React from "react";
import SignInNavbar from "@/components/SignInNavbar";

function layout({ children }) {
  return (
    <>
      <SignInNavbar />
      {children}
    </>
  );
}

export default layout;
