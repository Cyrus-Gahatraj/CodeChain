// synchronize auth status to database

import React from "react";
import Loading from "@/components/Loading";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { db } from "@/db";
import { usersTable } from "@/drizzle/schema";
import { eq } from "drizzle-orm";

function WelcomePage() {
  const { user, isLoaded } = useUser();
  const router = useRouter();

  useEffect(() => {
    const syncUser = async () => {
      if (!isLoaded || !user) return;

      try {
        // Check if user exists in database
        const existingUser = await db
          .select()
          .from(usersTable)
          .where(eq(usersTable.clerkId, user.id))
          .limit(1);

        if (existingUser.length === 0) {
          // Create user in database if not exists
          await db.insert(usersTable).values({
            clerkId: user.id,
            email: user.emailAddresses[0].emailAddress,
            name: `${user.firstName} ${user.lastName}`.trim(),
          });
        }

        // Redirect to questions page
        router.push("/questions");
      } catch (error) {
        console.error("Error syncing user:", error);
        // Handle error appropriately
      }
    };

    syncUser();
  }, [user, isLoaded, router]);

  return (
    <div className="flex w-full flex-1 items-center justify-center px-40 text-center">
      <div className="relative z-10 flex -translate-y-1/2 flex-col items-center gap-6 text-center">
        <Loading size="lg" />
        <h1>Creating your account...</h1>
      </div>
    </div>
  );
}

export default WelcomePage;
