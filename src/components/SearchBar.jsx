import React from "react";
import { Search } from "lucide-react";

function SearchBar() {
  return (
    <div className="fixed bottom-8 left-20 sm:left-48 right-0 p-4 z-100">
      <div className="flex items-center max-w-2xl mx-auto w-full p-3 pl-6 rounded-full bg-white/10  backdrop-blur-2xl border border-white/20 hover:backdrop-blur-0 focus-within:opacity-100  hover:border-transparent hover:shadow-[0_0_20px_2px_#eb5e28] focus-within:shadow-[0_0_20px_2px_#eb5e28] focus-within:backdrop-blur-0 focus-within:border-transparent  transition-all duration-[800ms] gap-3 opacity-95 hover:opacity-100">
        <Search className="h-5 w-5 text-[#eb5e28] flex-shrink-0" />
        <input
          type="text"
          placeholder="Search or ask a question..."
          className="w-full bg-transparent text-white placeholder:text-[#ccc5b9] focus:outline-none"
        />
      </div>
    </div>
  );
}

export default SearchBar;
