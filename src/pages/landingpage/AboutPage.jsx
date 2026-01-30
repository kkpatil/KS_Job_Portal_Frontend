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

import {
  useGetCMSContentsQuery,
} from "../../services/endpoints/cmsApi";

function AboutPage() {
  const { data, isLoading } = useGetCMSContentsQuery(
  {
    type: "PAGE",
    status: "ACTIVE",
  },
  {
    refetchOnMountOrArgChange: true,
  }
);


 const cms = React.useMemo(() => {
  const map = {};
  if (data?.data?.length) {
    data.data.forEach((item) => {
      map[item.slug] = item.content;
    });
  }
  return map;
}, [data]);


  if (isLoading) return null;
  return (
    <>
      <Header />
      <About />
      <InfoSection />
      <HowItWorks />
      <VideoHeroSection cms={cms}/>
      <FAQSection />
      <BestSection />
      <NewsBlogSection />
      <Footer />
    </>
  );
}

export default AboutPage;
