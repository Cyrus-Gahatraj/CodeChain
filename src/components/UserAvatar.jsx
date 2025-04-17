"use client"; 

import { useUser } from "@clerk/nextjs";
import Link from "next/link"
import Image from "next/image";

function UserAvatar({size = 42, link=true}) {
  const { isLoaded, isSignedIn, user } = useUser();

  if (!isLoaded) {
    return <div className="avatar loading" />;
  }

  if (!isSignedIn) {
    return <div className="avatar default" />;
  }
  
  const image = (
    <Image
       src={user.imageUrl}
       alt="Profile image"
       width={size}
       height={size}
       className="avatar rounded-full"
       priority
     />
  )


  return (
     link ? (<Link href="/profile">  
      {image}
    </Link>) : (
      image
    )
  );
}

export default UserAvatar;
