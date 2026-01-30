import React from "react";
import {
  FaCheckCircle,
  FaFacebookF,
  FaLinkedinIn,
  FaTwitter,
  FaBriefcase,
  FaClock,
  FaGraduationCap,
  FaMoneyBillWave,
  FaMapMarkerAlt,
  FaLayerGroup,
  FaUser,
  FaEnvelope,
  FaPhone,
} from "react-icons/fa";

export default function Main() {
  const keyResponsibilities = [
    "Manage and oversee multiple projects simultaneously, ensuring all deadlines are met without compromising quality, while coordinating with cross-functional teams to achieve organizational objectives.",
    "Develop and implement strategic plans to enhance operational efficiency and improve overall team performance, regularly monitoring progress and making data-driven adjustments..",
    "Analyze complex data and metrics to identify trends, risks, and opportunities, providing actionable insights and recommendations to management.",
    "Maintain comprehensive documentation, compliance records, and reports to ensure all processes meet company policies and regulatory standards.",
    "Mentor, guide, and support junior team members, fostering a collaborative and productive work environment while promoting professional growth.",
  ];

  const professionalSkills = [
    "Exceptional communication and interpersonal skills, with the ability to effectively convey ideas, negotiate solutions, and build strong relationships with colleagues and clients.",
    "Advanced proficiency in relevant tools, software, and platforms, such as project management systems, CRM software, and analytical tools, to drive efficiency and accuracy..",
    "Strong problem-solving and analytical abilities, with the capacity to approach challenges creatively, make informed decisions, and implement innovative solutions.",
    "Adaptable and flexible mindset, capable of thriving in a dynamic, fast-paced environment while maintaining professionalism and resilience",
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* LEFT SIDE */}
      <div className="lg:col-span-2 space-y-10">
        {/* Job Description */}
        <section>
          <h2 className="text-2xl font-semibold mb-4">Job Description</h2>
          <p className="text-gray-600 leading-relaxed text-sm">
            We are looking for a highly motivated and skilled [Job Title] to
            join our dynamic team. The ideal candidate will be responsible for
            [brief overview of the role] and will play a key role in driving
            [company goals]. This position requires a proactive individual who
            can work collaboratively across departments, maintain high standards
            of quality, and deliver results in a fast-paced environment. We are
            looking for a highly motivated and skilled [Job Title] to join our
            dynamic team.
            <br />
            The ideal candidate will be responsible for [brief overview of the
            role] and will play a key role in driving [company goals]. This
            position requires a proactive individual who can work
            collaboratively across departments, maintain high standards of
            quality, and deliver results in a fast-paced environment. We are
            looking for a highly motivated and skilled [Job Title] to join our
            dynamic team. The ideal candidate will be responsible for [brief
            overview of the role] and will play a key role in driving [company
            goals].
            <br />
            This position requires a proactive individual who can work
            collaboratively across departments, maintain high standards of
            quality, and deliver results in a fast-paced environment.
          </p>
        </section>

        {/* Key Responsibilities */}
        <section>
          <h2 className="text-2xl font-semibold mb-4">Key Responsibilities</h2>
          <ul className="space-y-3 text-sm text-gray-600">
            {keyResponsibilities.map((item, i) => (
              <li key={i} className="flex gap-3">
                <FaCheckCircle className="text-[#309689] mt-1" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Professional Skills */}
        <section>
          <h2 className="text-2xl font-semibold mb-4">Professional Skills</h2>
          <ul className="space-y-3 text-sm text-gray-600">
            {professionalSkills.map((item, i) => (
              <li key={i} className="flex gap-3">
                <FaCheckCircle className="text-[#309689] mt-1" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Share Job */}
        <section>
          <h3 className="text-lg font-semibold mb-3">Share Job:</h3>
          <div className="flex gap-4">
            {[FaFacebookF, FaTwitter, FaLinkedinIn].map((Icon, i) => (
              <div
                key={i}
                className="w-9 h-9 rounded-full border flex items-center justify-center
                hover:bg-[#309689] hover:text-white transition cursor-pointer"
              >
                <Icon />
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* RIGHT SIDE */}
      <div className="space-y-8">
        {/* Job Overview */}
        <div className="bg-[#F3FAF8] rounded-2xl p-4 space-y-4 text-sm">
          <h3 className="text-2xl font-semibold mb-5">Job Overview</h3>

          {[
            {
              icon: <FaBriefcase />,
              label: "Job Title",
              value: "Corporate Solutions Executive",
            },
            { icon: <FaClock />, label: "Job Type", value: "Full Time" },
            { icon: <FaLayerGroup />, label: "Category", value: "Commerce" },
            { icon: <FaUser />, label: "Experience", value: "5 Years" },
            { icon: <FaGraduationCap />, label: "Degree", value: "Master" },
            {
              icon: <FaMoneyBillWave />,
              label: "Offered Salary",
              value: "$40000 - $42000",
            },
            {
              icon: <FaMapMarkerAlt />,
              label: "Location",
              value: "New York, USA",
            },
          ].map((item, i) => (
            <div key={i} className="flex gap-5 items-start">
              <div className="text-[#309689] text-lg">{item.icon}</div>
              <div>
                <p className="font-bold">{item.label}</p>
                <p className="text-gray-600">{item.value}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Send Message */}
        <div className="bg-[#F3FAF8] rounded-2xl p-6">
          <h3 className="text-xl font-semibold mb-5">Send Us Message</h3>

          <form className="space-y-4 text-sm">
            <Input icon={<FaUser />} placeholder="Full name" />
            <Input icon={<FaEnvelope />} placeholder="Email Address" />
            <Input icon={<FaPhone />} placeholder="Phone Number" />
            <textarea
              placeholder="Your Message"
              className="w-full rounded-lg border px-4 py-3 focus:outline-none focus:ring-1 focus:ring-[#309689]"
            ></textarea>

            <button
              className="w-full bg-[#309689] text-white py-3 rounded-lg font-medium
              hover:opacity-90 transition"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

function Input({ icon, placeholder }) {
  return (
    <div className="flex items-center gap-3 border rounded-lg px-4 py-3">
      <span className="text-gray-400">{icon}</span>
      <input
        type="text"
        placeholder={placeholder}
        className="w-full focus:outline-none text-sm"
      />
    </div>
  );
}
