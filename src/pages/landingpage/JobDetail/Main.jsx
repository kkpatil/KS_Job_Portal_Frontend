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
import { Link, useParams } from "react-router-dom";
import { useGetJobByIdQuery } from "../../../services/endpoints/jobApi";

const timeAgo = (date) => {
  const diff = Math.floor((Date.now() - new Date(date)) / 60000);
  if (diff < 60) return `${diff} min ago`;
  if (diff < 1440) return `${Math.floor(diff / 60)} hrs ago`;
  return `${Math.floor(diff / 1440)} days ago`;
};

export default function Main() {
  const { id } = useParams();
  const { data: jobDetails, isLoading } = useGetJobByIdQuery(id);

  if (isLoading) return null;

  const job = jobDetails;
  if (!job) return null;

  const {
    title,
    employer,
    category,
    type,
    salary,
    location,
    description,
    keyResponsibilities = [],
    professionalSkills = [],
    createdAt,
  } = job;
 const jobUrl = `${window.location.origin}/jobs/${jobDetails?._id}`;
const shareText = `${jobDetails?.title} | Apply Now`;

const shareHandlers = [
  () =>
    window.open(
      `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(jobUrl)}`,
      "_blank",
      "width=600,height=500"
    ),

  () =>
    window.open(
      `https://twitter.com/intent/tweet?text=${encodeURIComponent(
        shareText
      )}&url=${encodeURIComponent(jobUrl)}`,
      "_blank",
      "width=600,height=500"
    ),

  () =>
    window.open(
      `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
        jobUrl
      )}`,
      "_blank",
      "width=600,height=500"
    ),
];

  return (
    <>
      <div
        className="w-full mt-10 max-w-6xl mx-auto bg-white rounded-2xl
          px-6 py-8 md:px-8 md:py-10 
          flex flex-col md:flex-row md:items-center md:justify-between gap-6"
      >
        {/* Left Section */}
        <div className="flex items-start gap-4 md:gap-6">
          <div className="w-14 h-14 flex-shrink-0 flex items-center justify-center rounded-full bg-white shadow border">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/3/33/Vanamo_Logo.png"
              alt="Company Logo"
              className="w-12 h-12"
            />
          </div>

          <div>
            <span className="text-xs text-gray-500 block mb-1">
              {timeAgo(createdAt)}
            </span>

            <h2 className="text-xl md:text-2xl font-semibold text-gray-900 leading-snug">
              {title}
            </h2>

            <p className="text-sm text-gray-500 mt-1 mb-4">
              {employer?.companyName}
            </p>

            <div className="flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <FaBriefcase className="text-[#309689]" />
                <span>{category}</span>
              </div>

              <div className="flex items-center gap-2">
                <FaClock className="text-[#309689]" />
                <span>{type}</span>
              </div>

              <div className="flex items-center gap-2 font-medium text-[#309689]">
                {salary}
              </div>

              <div className="flex items-center gap-2">
                <FaMapMarkerAlt className="text-[#309689]" />
                <span>{location}</span>
              </div>
            </div>
          </div>
        </div>

        <div>
          <Link
            to={"/login"}
            className="bg-[#309689] text-white px-7 py-2.5 rounded font-medium w-60
              hover:opacity-90 transition whitespace-nowrap"
          >
            Apply Job
          </Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* LEFT SIDE */}
        <div className="lg:col-span-2 space-y-10">
          <section>
            <h2 className="text-2xl font-semibold mb-4">Job Description</h2>
            <p className="text-gray-600 leading-relaxed text-sm">
              {description}
            </p>
          </section>

          {keyResponsibilities.length > 0 && (
            <section>
              <h2 className="text-2xl font-semibold mb-4">
                Key Responsibilities
              </h2>
              <ul className="space-y-3 text-sm text-gray-600">
                {keyResponsibilities.map((item, i) => (
                  <li key={i} className="flex gap-3">
                    <FaCheckCircle className="text-[#309689] mt-1" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {professionalSkills.length > 0 && (
            <section>
              <h2 className="text-2xl font-semibold mb-4">
                Professional Skills
              </h2>
              <ul className="space-y-3 text-sm text-gray-600">
                {professionalSkills.map((item, i) => (
                  <li key={i} className="flex gap-3">
                    <FaCheckCircle className="text-[#309689] mt-1" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </section>
          )}

       <section>
  <h3 className="text-lg font-semibold mb-3">Share Job:</h3>

  <div className="flex gap-4">
    {[FaFacebookF, FaTwitter, FaLinkedinIn].map((Icon, i) => (
      <div
        key={i}
        onClick={shareHandlers[i]}
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
          <div className="bg-[#F3FAF8] rounded-2xl p-4 space-y-4 text-sm">
            <h3 className="text-2xl font-semibold mb-5">Job Overview</h3>

            {[
              { icon: <FaBriefcase />, label: "Job Title", value: title },
              { icon: <FaClock />, label: "Job Type", value: type },
              { icon: <FaLayerGroup />, label: "Category", value: category },
              { icon: <FaUser />, label: "Experience", value: job.experience },
              {
                icon: <FaMoneyBillWave />,
                label: "Offered Salary",
                value: salary,
              },
              {
                icon: <FaMapMarkerAlt />,
                label: "Location",
                value: location,
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
    </>
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
