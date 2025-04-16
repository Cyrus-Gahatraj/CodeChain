import React from "react";
import { Bot } from "lucide-react";

function LeftSideBar() {
  return (
    <aside className="fixed top-16 left-0 h-[calc(100vh-4rem)] w:16  sm:w-48 p-4 pt-4 flex flex-col z-50 bg-background border-r border-r-[#ccc5b9]">
      <div className="flex flex-col h-full overflow-y-auto pt-8">
        <nav className="flex flex-col space-y-4 flex-grow">
          <div className="flex flex-col items-center justify-start gap-6 pl-2">
            <div className="flex gap-2 items-center justify-start cursor-pointer">
              <Bot className="size-9" />
              <span className="text-lg font-medium  sm:block hidden">AI</span>
            </div>
          </div>
        </nav>
      </div>
    </aside>
  );
}

export default LeftSideBar;
