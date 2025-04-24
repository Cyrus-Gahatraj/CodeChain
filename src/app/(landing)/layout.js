import React from "react";
import SignInNavbar from "@/components/SignInNavbar";

function Layout({ children }) {
  return (
    <>
      <SignInNavbar />
      {children}
    </>
  );
}

export default Layout;
