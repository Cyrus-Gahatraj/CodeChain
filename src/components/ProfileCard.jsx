"use client";

import React, { useState } from "react";
import Button from "@/components/Button";
import UserAvatar from "@/components/UserAvatar";
import { Cog } from "lucide-react";
import SettingsModal from "@/components/modal/SettingsModal";

function ProfileCard() {
  const [showSettings, setShowSettings] = useState(false);

 const handleSettingsClick = () => {
   console.log("Settings button clicked"); // Add this
   setShowSettings(true);
 };
  const handleCloseModal = () => {
    setShowSettings(false);
  };

  return (
    <main className="p-4">
      <div className="flex flex-col md:flex-row gap-4 md:gap-10 items-center w-full">
        <div className="flex justify-center w-full md:w-auto">
          <UserAvatar
            size="240"
            className="w-[120px] md:w-[240px]"
            link={false}
          />
        </div>

        <div className="flex flex-col gap-2 items-center md:items-start text-center md:text-left">
          <h1 className="text-2xl md:text-3xl font-bold text-white">Cyrus</h1>
          <p className="text-base md:text-lg text-[#ccc5b9]">Cyrus-Gahatraj</p>
          <Button
            className="group p-3 md:p-[20px] mt-4 w-full md:w-auto"
            handleClick={handleSettingsClick}
          >
            <div className="flex items-center justify-center gap-1">
              <Cog className="h-5 w-5 mr-2 group-hover:rotate-90 transition-all duration-800 ease-in-out" />
              <p>Settings</p>
            </div>
          </Button>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row justify-center md:justify-start md:pl-14 gap-4 md:gap-6 mt-6 mb-6">
        <Button className="bg-sky-500 border-2 border-sky-500 p-3 md:p-[20px] w-full sm:w-auto">
          Follow
        </Button>
        <Button className="bg-sky-500 border-2 border-sky-500 p-3 md:p-[20px] w-full sm:w-auto">
          Following
        </Button>
      </div>

      {showSettings && <SettingsModal onClose={handleCloseModal} />}
    </main>
  );
}

export default ProfileCard;
