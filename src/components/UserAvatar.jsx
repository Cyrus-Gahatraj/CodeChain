"use client"; // Add this at the very top

import { useUser } from "@clerk/nextjs";
import Link from "next/link"
import Image from "next/image";

function UserAvatar({size = 42}) {
  const { isLoaded, isSignedIn, user } = useUser();

  if (!isLoaded) {
    return <div className="avatar loading" />;
  }

  if (!isSignedIn) {
    return <div className="avatar default" />;
  }

  return (
    <Link href="/profile">  
      <Image
        src={user.imageUrl}
        alt="Profile image"
        width={size}
        height={size}
        className="avatar rounded-full"
        priority
      />
    </Link>
  );
}

export default UserAvatar;
