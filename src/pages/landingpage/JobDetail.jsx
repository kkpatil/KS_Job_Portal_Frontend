import React from "react";
import Hero from "./JobDetail/Hero";
import Head from "./JobDetail/Head";
import Main from "./JobDetail/Main";
import Header from "../../components/home/layout/Header";
import Footer from "../../components/home/layout/Footer";
function JobDetail() {
  return (
    <>
      <Header />
      <Hero />
      <Head />
      <Main />
      <Footer />
    </>
  );
}

export default JobDetail;
