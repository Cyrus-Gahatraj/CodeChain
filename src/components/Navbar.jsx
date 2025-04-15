import React from "react";
import Link from "next/link";
import {  UserButton } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs/server";
import Image from "next/image";

const Navbar = async () => {
  const user = await currentUser();

  return (
    <div className="flex justify-center w-full">
      <nav className="h-[80px] flex justify-between items-center text-white font-bold container px-4 sm:px-6">
        <div className="flex items-center">
          <Link href="/questions">
            <Image
              src="/logo.png"
              alt="Logo"
              width={60}
              height={32}
              className="object-contain w-16 sm:w-20 md:w-24"
            />
          </Link>
        </div>

        {user ? (
          <div className="flex items-center gap-3 sm:gap-5">
            <UserButton
              userProfileMode="navigation"
              userProfileUrl="/profile" 
              appearance={{
                elements: {
                  userButtonAvatarBox: {
                    width: "32px",
                    height: "32px",
                    "@sm": {
                      width: "40px",
                      height: "40px",
                    },
                  },
                },
              }}
            />
          </div>
        ) : (
          <div className="flex items-center gap-3 sm:gap-5">
            <button className="font-light text-[#ccc5b9] cursor-pointer hover:scale-103 hover:text-white transition-all duration-700 ease text-sm sm:text-base">
              <Link href="/pricing">Pricing</Link>
            </button>

            <button className="font-light text-[#ccc5b9] cursor-pointer hover:scale-103 hover:text-white transition-all duration-700 ease text-sm sm:text-base">
              <Link href="/sign-in">Sign-in</Link>
            </button>

            <div className="relative left-1 h-5 sm:h-7 w-[0.6px] bg-[#777169]"></div>
            <button className="btn-log-in rounded-full bg-sky-500 text-white text-sm sm:text-base px-3 py-1 sm:px-4 sm:py-2">
              <Link href="/sign-up">Sign-up</Link>
            </button>
          </div>
        )}
      </nav>
    </div>
  );
};

export default Navbar;
