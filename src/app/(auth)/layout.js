import React from "react";
import SignInNavbar from "@/components/SignInNavbar";

function layout({ children }) {
  return (
    <div className="max-h-screen overflow-hidden ">
      <SignInNavbar />
      {children}
    </div>
  );
}

export default layout;
