import React from "react";
import Header from "../../components/home/layout/Header";
import Hero from "./ContactUs/Hero";
import ContactSection from "./ContactUs/Main";
import MapBrandSection from "./ContactUs/Map";
import Footer from "../../components/home/layout/Footer";
function ContactUs() {
  return (
    <>
      <Header />
      <Hero />
      <ContactSection />
      <MapBrandSection />
      <Footer />
    </>
  );
}

export default ContactUs;
