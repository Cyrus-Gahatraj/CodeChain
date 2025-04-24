"use client";

import React from "react";
import { ArrowLeft } from "lucide-react";
import ProfileCard from "@/components/ProfileCard";
import ProfileGrid from "@/components/ProfileGrid";
import Link from "next/link";
import { usePathname } from "next/navigation";

const contributionData = Array(52)
  .fill()
  .map(() => Array(7).fill(0));

contributionData[20][3] = 2;
contributionData[21][1] = 4;
contributionData[18][5] = 1;
contributionData[20][0] = 3;  

function layout({ children }) {

  const pathname = usePathname();
  const profileLink = [
    {
      id: 1,
      label: "Questions",
      href: "/profile",
    },
    {
      id: 2,
      label: "Reviews",
      href: "/profile/reviews",
    },
    {
      id: 3,
      label: "Bookmarks",
      href: "/profile/bookmarks"
    }
  ]

  return (
    <>
      <nav className="flex h-12 pl-6 items-center justify-start">
        <Link href="/questions">
          <ArrowLeft />
        </Link>
      </nav>

      <main className="w-[80vw]  mx-auto p-4 border-b border-[#ccc5b9] flex gap-10 flex-wrap items-center justify-center md:justify-evenly">
        <ProfileCard />
        <ProfileGrid data={contributionData} />
      </main>
      <div className="w-[78vw] text-[#ccc4b8] mx-auto flex justify-around gap-6 mt-3">
        
        {profileLink.map((item) => {
          const isActive = item.href===pathname;
          const nonActiveLink = "font-bold mt-4";
          const activeLink = `${nonActiveLink}  text-white underline underline-offset-4`;
          return(
            <Link href={item.href} key={item.id}>
              <h1 className={isActive ? activeLink : nonActiveLink}>{item.label}</h1>
            </Link>
          )
        })}
      </div>
        {children}
    </>
  );
}

export default layout;