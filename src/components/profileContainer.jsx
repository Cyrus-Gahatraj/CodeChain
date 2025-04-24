import React from 'react'

function profileContainer({children}) {
  return (
    <div className="flex justify-start flex-wrap items-start w-[75vw] min-h-[350px] p-5 mx-auto mt-6">
      {children}
    </div>
  );
}

export default profileContainer