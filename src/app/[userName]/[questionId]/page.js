import React from "react";
import LeftSideBar from "@/components/LeftSideBar";
import { db } from "@/db";
import { questionsTable, usersTable } from "/drizzle/schema";
import { eq, and } from "drizzle-orm";
import { notFound } from "next/navigation";

async function QuestionPage({ params }) {
  const questionId = parseInt(params.questionId);

  if (isNaN(questionId)) {
    notFound();
  }

  const question = await db
    .select()
    .from(questionsTable)
    .where(
      and(
        eq(questionsTable.id, questionId),
        eq(questionsTable.userId, params.userName)
      )
    )
    .limit(1);

  if (!question.length) {
    notFound();
  }

  return (
    <div className="flex relative min-h-screen overflow-hidden justify-center">
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(255,255,255,0.05) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255,255,255,0.05) 1px, transparent 1px)
          `,
          backgroundSize: "30px 30px",
          backgroundColor: "#0f0f0f",
        }}
      />

      <div className="relative z-10 mx-auto">
        <LeftSideBar />
        <main className="flex flex-col gap-20 ml-20 sm:ml-48 max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="p-6 rounded-2xl bg-[#0B0B09] text-white space-y-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">{question[0].title}</h2>
            </div>
            <p className="text-base text-[#e0dfdc]">{question[0].content}</p>
          </div>
        </main>
      </div>
    </div>
  );
}

export default QuestionPage;
