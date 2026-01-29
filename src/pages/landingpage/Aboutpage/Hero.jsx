import React from "react";
import InfoSection from "./Main";
import HowItWorks from "./HowitWorks";
import VideoHeroSection from "./Card";
import FAQSection from "./Questions";
import BestSection from "./workingBest";
import NewsBlogSection from "./NewsandBlogs";
function About() {
  return (
    <div>
      <section className="w-full h-[40vh] bg-black flex items-center justify-center">
        <h1 className="text-white text-5xl md:text-6xl font-bold">About US</h1>
      </section>
    </div>
  );
}

export default About;
