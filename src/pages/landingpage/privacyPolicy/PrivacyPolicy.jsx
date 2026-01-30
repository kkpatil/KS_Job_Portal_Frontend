import React from "react";
import Header from "../../../components/home/layout/Header";
import Footer from "../../../components/home/layout/Footer";

export default function PrivacyPolicy() {
  return (
    <div>
      <Header />
      <div className="min-h-screen bg-white flex justify-center items-start py-16 px-4 mt-20">
        <div className="max-w-4xl w-full">
          {/* Header */}
          <div className="mb-12">
            <h1 className="text-4xl flex gap-2 font-bold text-[#309689] mb-4 tracking-wide">
              <p className="text-black">Privacy</p> Policy
            </h1>
            <p className="text-black text-md leading-relaxed">
              This Privacy Policy explains how our Job Portal collects, uses,
              and protects your personal information when you use our platform.
              We are committed to maintaining transparency and safeguarding your
              data.
            </p>
          </div>

          {/* Sections */}
          {[
            {
              title: "Introduction",
              content:
                "Welcome to our Job Portal. We value your privacy and are committed to protecting your personal information. This Privacy Policy explains how we collect, use, store, and safeguard your data when you access or use our website, services, and related features. Our platform is designed to connect job seekers with employers in a secure and transparent manner, and we ensure that your personal data is handled responsibly and in accordance with applicable data protection laws.",
            },
            {
              title: "Information We Collect",
              content:
                "We collect information from users, including personal details such as name, email, phone number, and location; professional information like resumes, work experience, education, skills, and portfolio links; account and login credentials; as well as usage data such as job searches, applications, and pages visited. We may also collect technical information, including IP address, device type, browser, and cookies, to enhance website performance and security. Any information shared voluntarily, such as profile pictures or social media links, is used to improve user experience and job matching. This information is collected to provide personalized services, facilitate communication, and improve the overall functionality of our job portal.",
            },
            {
              title: "How We Use Information",
              content:
                "We use the information we collect to provide and improve our services, including matching candidates with relevant job opportunities and helping employers find qualified talent. Personal and professional details are used to create and manage user accounts, process applications, and facilitate effective communication. Usage and technical information help us enhance website performance, ensure security, and deliver a personalized user experience. Any voluntarily shared information, such as profile pictures or social links, is used to enrich user profiles and support engagement within the platform.",
            },
            {
              title: "Cookies & Tracking Technologies",
              content:
                "Our job portal uses cookies and similar tracking technologies to enhance your browsing experience, analyze site traffic, and provide personalized job recommendations. These technologies help us remember your preferences, maintain user sessions, and improve website functionality. We may also use cookies for analytics, advertising, and performance monitoring to better understand user behavior and optimize our services. You can manage or disable cookies through your browser settings; however, certain features of the portal may not function properly if cookies are disabled",
            },
            {
              title: "Third-Party Sharing",
              content:
                "We do not sell or rent your personal information to third parties. We may share your information with trusted service providers, business partners, or employers to facilitate job matching, recruitment, and other services offered on our platform. Additionally, we may disclose information when required by law or to protect the rights, safety, or property of our users and the portal. Any third-party sharing is conducted under strict agreements to ensure the confidentiality and security of your data.",
            },
            {
              title: "Data Security",
              content:
                "You have the right to access, update, or delete your personal information at any time. You may also request to deactivate your account or withdraw consent for certain data usage.",
            },
            {
              title: "User Rights",
              content:
                "We take the security of your personal and professional information seriously. Our platform implements industry-standard measures, including encryption, secure servers, and access controls, to protect your data from unauthorized access, loss, or misuse. While we strive to maintain the highest level of security, no method of transmission over the internet or electronic storage is completely risk-free. By using our portal, you acknowledge and accept these security practices and agree to take reasonable precautions to protect your account credentials",
            },
            {
              title: "Updates",
              content:
                "We may update this Privacy Policy from time to time to reflect changes in our practices, legal requirements, or platform improvements. Any updates will be posted on this page with a revised effective date. We encourage users to review the Privacy Policy periodically to stay informed about how we collect, use, and protect information. Continued use of the platform after updates constitutes acceptance of the revised policy",
            },
          ].map((section, index) => (
            <div
              key={index}
              className="mb-8 p-6 rounded-2xl  transition-all duration-300  hover:-translate-y-1"
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
            If you have any questions regarding this Privacy Policy, please
            contact us through the support section of our Job Portal.
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
}
