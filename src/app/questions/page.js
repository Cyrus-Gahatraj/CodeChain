import React from "react";
import LeftSideBar from "@/components/LeftSideBar";
import SearchBar from "@/components/SearchBar";
import QuestionCard from "@/components/QuestionCard";
import posts from "@/app/data/posts.json";
import { Bot } from "lucide-react";
import Link from "next/link";

function QuestionsPage() {
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
        <LeftSideBar>
          <Link href="/ask-ai">
            <div className="flex gap-2 items-center justify-start cursor-pointer">
              <Bot className="size-9" />
              <span className="text-lg font-medium  sm:block hidden">AI</span>
            </div>
          </Link>
        </LeftSideBar>

        <main className="flex flex-col gap-20 ml-20 sm:ml-48 max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8 ">
          <div className="shadow rounded-lg p-6 bg-[#0B0B09] border-2 border-white">
            <h2 className="text-xl font-semibold mb-4">
              Welcome to CodeChain!
            </h2>
            <p className="text-sm text-[#ccc5b9]">
              This is where you&apos;ll find and ask coding questions. The AI
              will provide initial answers, and the community will help refine
              them.
            </p>
          </div>

          <div className="flex flex-col w-[95%] mx-auto gap-18">
            {Object.entries(posts).map(([id, post]) => (
              <QuestionCard
                key={id}
                id={id}
                userName={post.userName}
                lang={post.lang}
                question={post.question}
                likes={post.likes}
                reviews={post.reviews}
              />
            ))}
          </div>
          <SearchBar />
        </main>
      </div>
    </div>
  );
}

export default QuestionsPage;
