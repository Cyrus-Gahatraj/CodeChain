import { ArrowLeft } from "lucide-react";
import ProfileCard from "@/components/ProfileCard";
import ProfileGrid from "@/components/ProfileGrid";
import Link from "next/link";
import { notFound } from "next/navigation";
import { db } from "@/db";
import { usersTable } from "/drizzle/schema";
import { eq } from "drizzle-orm";

async function ProfilePage({ params }) {
  const user = await db
    .select()
    .from(usersTable)
    .where(eq(usersTable.name, params.userName))
    .limit(1);

  if (!user.length) {
    notFound();
  }

  const contributionData = Array(52)
    .fill()
    .map(() => Array(7).fill(0));
  contributionData[20][3] = 2;
  contributionData[21][1] = 4;
  contributionData[18][5] = 1;
  contributionData[20][0] = 3;

  return (
    <>
      <nav className="flex h-12 pl-6 items-center justify-start">
        <Link href="/questions">
          <ArrowLeft />
        </Link>
      </nav>

      <main className="w-[80vw] mx-auto p-4 border-b border-[#ccc5b9] flex gap-10 flex-wrap items-center justify-center md:justify-evenly">
        <ProfileCard user={user[0]} />
        <ProfileGrid data={contributionData} />
      </main>
    </>
  );
}

export default ProfilePage;
