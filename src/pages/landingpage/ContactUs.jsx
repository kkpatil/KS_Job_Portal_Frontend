import React from "react";
import Header from "../../components/home/layout/Header";
import Hero from "./ContactUs/Hero";
import ContactSection from "./ContactUs/ContactSection";
import MapBrandSection from "./ContactUs/MapBrandSection";
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
