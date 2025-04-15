import React from "react";

function Card({ title, description, icon }) {
  return (
    <div className="card p-2 flex flex-col justify-center items-center shrink-0 bg-[#FBFCF8] shadow-xl rounded-xl  w-[320px] h-[275px] text-gray-800 gap-5">
      {icon && <div className="w-16 h-16">{icon}</div>}
      <h1 className="text-2xl font-bold">{title}</h1>
      <p className="font-light m-1 px-3">
        {description}
      </p>
    </div>
  );
}

export default Card;
