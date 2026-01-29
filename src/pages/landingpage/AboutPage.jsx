import React from "react";
import Header from "../../components/home/layout/Header";
import About from "./Aboutpage/Hero";
import InfoSection from "./Aboutpage/Main";
import HowItWorks from "./Aboutpage/HowitWorks";
import VideoHeroSection from "./Aboutpage/Card";
import FAQSection from "./Aboutpage/Questions";
import BestSection from "./Aboutpage/workingBest";
import NewsBlogSection from "./Aboutpage/NewsandBlogs";
import Footer from "../../components/home/layout/Footer";
function AboutPage() {
  return (
    <>
      <Header />
      <About />
      <InfoSection />
      <HowItWorks />
      <VideoHeroSection />
      <FAQSection />
      <BestSection />
      <NewsBlogSection />
      <Footer />
    </>
  );
}

export default AboutPage;
