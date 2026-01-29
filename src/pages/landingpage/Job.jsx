import React from "react";
import Header from "../../components/home/layout/Header";
import JobsHero from "./Job/Hero";
import JobBoardMain from "./Job/Main";
import TopCompany from "./Job/TopCompany";
import Footer from "../../components/home/layout/Footer";

function Job() {
  return (
    <>
      <Header />
      <JobsHero />
      <JobBoardMain />
      <TopCompany />
      <Footer />
    </>
  );
}

export default Job;
