"use client";
import { useState, useEffect } from "react";
import React from "react";
import Button from "@/components/Button";

function JoinNow() {

  const [showButton, setShowButton] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      if (window.pageYOffset > 300) {
        setShowButton(true);
      } else {
        setShowButton(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    const scrollStep = -window.scrollY / 20; 
    const scrollInterval = setInterval(() => {
      if (window.scrollY !== 0) {
        window.scrollBy(0, scrollStep);
      } else {
        clearInterval(scrollInterval);
      }
    }, 21); 
  };

  return (
    <section className="flex flex-col justify-center items-center text-center gap-7">
      <div className="flex flex-col gap-11">
        <h1 className="text-3xl font-bold">Join the Codechain Community</h1>
        <p className="font-normal text-[#ccc5b9]">
          Be part of the future of programming Q&A. Get instant AI-powered
          answers and contribute to the community.
        </p>
      </div>
      <Button text="Join Now" handleClick={scrollToTop} />
    </section>
  );
}

export default JoinNow;
