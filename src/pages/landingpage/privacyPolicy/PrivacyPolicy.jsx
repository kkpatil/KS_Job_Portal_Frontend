import React from "react";
import Header from "../../../components/home/layout/Header";
import Footer from "../../../components/home/layout/Footer";
import { useGetCMSBySlugQuery } from "../../../services/endpoints/cmsApi";

export default function PrivacyPolicy() {
  const { data, isLoading } = useGetCMSBySlugQuery("privacy.policy");

  const content = data?.data?.content || {};

  if (isLoading) {
    return (
      <>
        <Header />
        <div className="min-h-screen flex justify-center items-center">
          Loading...
        </div>
        <Footer />
      </>
    );
  }

  return (
    <div>
      <Header />

      <div className="min-h-screen bg-white flex justify-center items-start py-16 px-4 mt-20">
        <div className="max-w-4xl w-full">
          {/* HEADER */}
          <div className="mb-12">
            <h1 className="text-4xl flex gap-2 font-bold text-[#309689] mb-4 tracking-wide">
              <span className="text-black">Privacy</span> Policy
            </h1>

            {/* INTRO */}
            {content.intro && (
              <div
                className="text-black text-md leading-relaxed"
                dangerouslySetInnerHTML={{ __html: content.intro }}
              />
            )}
          </div>

          {/* SECTIONS */}
          {(content.sections || []).map((section, index) => (
            <div
              key={index}
              className="mb-8 p-6 rounded-2xl transition-all duration-300 hover:-translate-y-1"
            >
              <h2 className="text-3xl font-semibold text-black mb-3">
                {section.title}
              </h2>

              <div
                className="text-black text-sm leading-relaxed"
                dangerouslySetInnerHTML={{ __html: section.content }}
              />
            </div>
          ))}

          {/* FOOTER NOTE */}
          {content.footerNote && (
            <div
              className="text-sm text-gray-600 mt-10"
              dangerouslySetInnerHTML={{ __html: content.footerNote }}
            />
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}
