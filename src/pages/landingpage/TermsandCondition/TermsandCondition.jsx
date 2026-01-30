import React from "react";
import Header from "../../../components/home/layout/Header";
import Footer from "../../../components/home/layout/Footer";

export default function TermsandConditions() {
  return (
    <div>
      <Header />

      <div className="min-h-screen bg-white flex justify-center items-start py-16 px-4 mt-20">
        <div className="max-w-4xl w-full">
          {/* Header */}
          <div className="mb-12">
            <h1 className="text-4xl flex gap-2 font-bold text-[#309689] mb-4 tracking-wide">
              <p className="text-black">Terms</p> & Conditions
            </h1>
            <p className="text-black text-md leading-relaxed">
              These Terms & Conditions govern your access to and use of our Job
              Portal. By accessing or using our platform, you agree to comply
              with and be bound by these terms.
            </p>
          </div>

          {/* Sections */}
          {[
            {
              title: "Introduction",
              content:
                "Welcome to our Job Portal. These Terms & Conditions govern your access to and use of our website, services, and related features. By accessing, browsing, or using this platform, you agree to comply with and be legally bound by these terms. This portal is designed to facilitate connections between job seekers and employers in a secure and transparent manner. If you do not agree with any part of these Terms & Conditions, you should discontinue use of the platform immediately.",
            },
            {
              title: "Eligibility",
              content:
                "To use our Job Portal, you must be at least 18 years of age and legally capable of entering into a binding agreement. By accessing or using the platform, you represent and warrant that the information you provide is accurate, complete, and up to date. Users must comply with all applicable laws and regulations while using the portal. The platform reserves the right to restrict, suspend, or terminate access for users who do not meet eligibility requirements or who provide false or misleading information.",
            },
            {
              title: "User Accounts",
              content:
                "To access certain features of the Job Portal, users may be required to create an account. You are responsible for maintaining the confidentiality of your account credentials, including your username and password, and for all activities carried out under your account. You agree to provide accurate, current, and complete information during registration and to keep your account details updated. The Job Portal reserves the right to suspend or terminate accounts that contain false information, violate these Terms & Conditions, or engage in unauthorized or harmful activities.",
            },
            {
              title: "Use of the Platform",
              content:
                "Users agree to use the Job Portal only for lawful and legitimate purposes. Job seekers may search and apply for job opportunities, create profiles, and communicate with employers, while employers may post job listings and review candidate applications. Users must not misuse the platform by posting false, misleading, or inappropriate content, attempting unauthorized access, or engaging in activities that disrupt the operation of the portal. Any use of the platform that violates applicable laws, regulations, or these Terms & Conditions may result in suspension or termination of access.",
            },
            {
              title: "Job Listings & Applications",
              content:
                "The Job Portal acts solely as a platform to connect job seekers and employers and does not guarantee job placement, hiring decisions, or employment outcomes. Employers are responsible for the accuracy, completeness, and legality of job listings posted on the platform, while job seekers are responsible for the information provided in their profiles and applications. The portal does not verify the authenticity of all listings or candidates and shall not be held liable for any disputes, decisions, or interactions arising between employers and job seekers.",
            },
            {
              title: "Intellectual Property",
              content:
                "All content, materials, trademarks, logos, designs, software, and other intellectual property displayed on or used by the Job Portal are the exclusive property of the platform or its licensors. Users are granted a limited, non-exclusive, and non-transferable right to access and use the platform for personal and lawful purposes only. Any reproduction, distribution, modification, or unauthorized use of the portal’s content or intellectual property without prior written permission is strictly prohibited and may result in legal action.",
            },
            {
              title: "Limitation of Liability",
              content:
                "The Job Portal shall not be held liable for any direct, indirect, incidental, consequential, or special damages arising out of or in connection with the use of, or inability to use, the platform. This includes, but is not limited to, loss of data, loss of employment opportunities, hiring decisions, service interruptions, or interactions between job seekers and employers. The portal acts solely as an intermediary and does not assume responsibility for the accuracy of job listings, user content, or outcomes resulting from the use of the platform.",
            },
            {
              title: "Termination",
              content:
                "The Job Portal reserves the right to suspend or terminate user access, with or without prior notice, if a user violates these Terms & Conditions, applicable laws, or engages in activities that may harm the platform or other users. Users may also choose to deactivate or delete their accounts at any time, subject to applicable policies. Upon termination, access to certain features may be restricted, and any obligations or liabilities incurred prior to termination shall remain in effect.",
            },
            {
              title: "Changes to Terms",
              content:
                "We reserve the right to modify or update these Terms & Conditions at any time to reflect changes in our services, legal requirements, or business practices. Any updates will be effective immediately upon being posted on the Job Portal. Users are encouraged to review the Terms & Conditions periodically. Continued use of the platform after changes are published constitutes acceptance of the revised terms.",
            },
          ].map((section, index) => (
            <div
              key={index}
              className="mb-8 p-6 rounded-2xl transition-all duration-300 hover:-translate-y-1"
            >
              <h2 className="text-3xl font-semibold text-black mb-3">
                {section.title}
              </h2>
              <p className="text-black text-sm leading-relaxed">
                {section.content}
              </p>
            </div>
          ))}

          {/* Footer note */}
          <p className="text-sm text-gray-600 mt-10">
            If you have any questions regarding these Terms & Conditions, please
            contact us through the support section of our Job Portal.
          </p>
        </div>
      </div>

      <Footer />
    </div>
  );
}
