import React from "react";

function QuestionsPage() {
  return (
    <div className="min-h-screen bg-[#2B2B2D]">
      <main className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="  shadow rounded-lg p-6 bg-[#161613]  ">
          <h2 className="text-xl font-semibold mb-4">Welcome to CodeChain!</h2>
          <p className="text-sm text-[#ccc5b9]">
            This is where you'll find and ask coding questions. The AI will
            provide initial answers, and the community will help refine them.
          </p>
        </div>
      </main>
    </div>
  );
}

export default QuestionsPage;
