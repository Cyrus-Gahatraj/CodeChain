import React from "react";
import { Plus } from "lucide-react";

function AddButton() {
  return (
    <div className="fixed bottom-8 right-8 p-4 z-25 flex items-center justify-center">
      <div className="flex items-center justify-center w-16 h-16 p-5 rounded-full bg-green-600 backdrop-blur-2xl border border-white/20 hover:backdrop-blur-0 hover:border-transparent hover:shadow-[0_0_20px_2px_#36a53d] transition-all duration-[800ms] gap-3 opacity-95 hover:opacity-100">
        <button className="flex items-center justify-center w-full bg-transparent text-white focus:outline-none">
          <Plus className="h-10 w-10 text-white flex-shrink-0" />
        </button>
      </div>
    </div>
  );
}

export default AddButton;
