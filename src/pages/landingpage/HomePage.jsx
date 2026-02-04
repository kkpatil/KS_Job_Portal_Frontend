import React from "react";
import Header from "../../components/home/layout/Header";
import HeroSection from "./Homepage/HeroSection";
import RecentJobs from "./Homepage/RecentJobs";
import JobCategory from "./Homepage/JobCategory";
import CompanySection from "./Homepage/CompanySection";
import CTASection from "./Homepage/CTASection";
import Testimonials from "./Homepage/Testimonials";
import NewsBlog from "./Homepage/NewsBlog";
import Footer from "../../components/home/layout/Footer";

function HomePage() {
  return (
    <>
      <Header />
      <HeroSection />
      <RecentJobs />
      <JobCategory />
      <CompanySection />
      <CTASection />
      <Testimonials />
      <NewsBlog />
      <Footer />
    </>
  );
}

export default HomePage;
