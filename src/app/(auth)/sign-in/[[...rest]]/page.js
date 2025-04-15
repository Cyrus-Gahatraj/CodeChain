"use client";

import { SignIn } from '@clerk/clerk-react'
import React from 'react'

function page() {
  return (
    <div className='w-full flex-1 flex flex-col gap-2 items-center justify-center'>
       <h1 className='relative bottom-5 text-2xl'> Welcome back </h1>
        <SignIn/>
    </div>
  )
}

export default page