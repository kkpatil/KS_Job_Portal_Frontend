import React from "react";
import Header from "../../components/home/layout/Header";
import About from "./Aboutpage/About";
import InfoSection from "./Aboutpage/InfoSection";
import HowItWorks from "./Aboutpage/HowitWorks";
import VideoHeroSection from "./Aboutpage/VideoHeroSection";
import FAQSection from "./Aboutpage/FAQSection";
import BestSection from "./Aboutpage/BestSection";
import NewsBlogSection from "./Aboutpage/NewsBlogSection";
import Footer from "../../components/home/layout/Footer";

import { useGetCMSContentsQuery } from "../../services/endpoints/cmsApi";

function AboutPage() {
  const { data, isLoading } = useGetCMSContentsQuery(
    {
      type: "PAGE",
      status: "ACTIVE",
    },
    {
      refetchOnMountOrArgChange: true,
    },
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

  if (isLoading) return <p >Loading...</p>;
  return (
    <>
      <Header />
      <About />
      <InfoSection cms={cms}/>
      <HowItWorks cms={cms}/>
      <VideoHeroSection cms={cms} />
      <FAQSection cms={cms}/>
      <BestSection />
      <NewsBlogSection />
      <Footer />
    </>
  );
}

export default AboutPage;
