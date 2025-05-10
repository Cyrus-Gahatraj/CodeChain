import React from "react";
import clsx from "clsx"; // Make sure to install this via `npm install clsx` if not already

function LeftSideBar({ children, className }) {
  return (
    <aside
      className={clsx(
        "fixed top-16 left-0 h-[calc(100vh-4rem)] p-4 pt-4 flex flex-col z-50 bg-background border-r border-r-[#ccc5b9]",
        className
      )}
    >
      <div className="flex flex-col h-full overflow-y-auto pt-8">
        <nav className="flex flex-col space-y-4 flex-grow">
          <div className="flex flex-col items-center justify-start gap-6 pl-2">
            {children}
          </div>
        </nav>
      </div>
    </aside>
  );
}

export default LeftSideBar;
