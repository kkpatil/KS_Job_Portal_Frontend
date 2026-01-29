import React from "react";
import Header from "../../components/home/layout/Header";
import HeroSection from "./homePage/Hero";
import RecentJobs from "./Homepage/RecentJobs";
import JobCategory from "./Homepage/JobCategory";
import CompanySection from "./Homepage/CompanyReview";
import CTASection from "./homePage/Card";
import Testimonials from "./homePage/Testinomials";
import NewsBlog from "./homePage/NewsandBlogs";
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
