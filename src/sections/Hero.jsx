import React from 'react'
import Button from '@/components/Button'
import Link from 'next/link'


function Hero() {
  return (
    <section className="h-[87vh]">
      <div className="flex flex-col items-center    justify-center h-full text-center gap-4">
        <h1 className="text-5xl font-bold">
          CodeChain!
        </h1>

        <h3 className="text-2xl tracking-tighter ">
          FROM AI MAKE IT, FROM FEEDBACK GET IT.
        </h3>

        <br />

        <p className="text-md w-[80vw] tracking-widest text-base/7 text-[#ccc5b9]">
          Welcome to CodeChain - the revolutionary Q&A platform where
          intelligent AI provides initial solutions, and our expert community
          refines them. Get answers faster, learn better, together.
        </p>
        <br />
        <Link href="/sign-in">
           <Button>
            Get Started
           </Button>
        </Link>
      </div>
    </section>
  );
}

export default Hero