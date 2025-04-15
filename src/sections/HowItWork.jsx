import React from "react";
import Card from "@/components/Card";
import { FaQuestionCircle, FaUsers } from "react-icons/fa";
import { ArrowRight } from "lucide-react";

function HowItWork() {
  const card1 = {
    title: "1.Ask a Question",
    description:
      "Submit your coding query and our AI instantly provides a potential solution or guidance.",
    icon: <FaQuestionCircle className="w-full h-full text-blue-500" />,
  };

  const card2 = {
    title: "2.Community Enhances",
    description:
      "Experts in the community review, refine, and add human insight to the AI's answer.",
    icon: <FaUsers className="w-full h-full text-green-500" />,
  };

  return (
    <section className="flex justify-center items-center">
      <div className="container flex flex-col gap-16  max-w-6xl">
        <h1 className="text-4xl font-bold text-center">How CodeChain Works</h1>

        <div className="flex flex-col md:flex-row justify-center items-center gap-8 md:gap-12">
          <Card {...card1} />
          <ArrowRight className="size-11 text-white shrink-0 hidden md:block" />
          <Card {...card2} />
        </div>
      </div>
    </section>
  );
}

export default HowItWork;
