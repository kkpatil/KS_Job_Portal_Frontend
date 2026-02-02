import React from "react";

const CandidateProfile = () => {
  return (
    <div
      className="min-h-screen text-white  py-14 px-4 flex justify-center bg-linear-to-tr bg-gradient-to-br from-[#eae4e4] via-[#e6f0ef] to-[#ece3e3]
"
    >
      <div className="w-full max-w-6xl ">
        {/* ===== HEADER ===== */}
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-semibold flex gap-1 text-black ml-5">
            <span className="text-[#309689]">My</span> Profile
          </h2>
        </div>

        {/* ===== SINGLE MAIN CARD ===== */}
        <div
          className="
bg-white
          rounded-2xl
    shadow-md
    p-10
    space-y-16
    transition-all duration-300
    hover:shadow-2xl
  "
        >
          {/* ===== PROFILE TOP ===== */}
          {/* ===== PROFILE TOP ===== */}
          <div className="flex items-center justify-between border-b pb-8">
            <div className="flex items-center gap-5">
              <div
                className="
      w-16 h-16 rounded-full bg-[#309689]/10
      flex items-center justify-center text-2xl
      text-[#309689] font-bold
    "
              >
                👤
              </div>

              <div>
                <h3 className="font-semibold text-xl text-black">
                  Ritika Bhangade
                </h3>
                <p className="text-sm text-gray-500">Indore, India</p>
              </div>
            </div>

            {/* EDIT BUTTON */}
            <button
              className="
            px-6 py-2 mr-10 rounded-lg text-sm font-medium
            bg-[#309689] text-white
            hover:bg-black hover:scale-105
            transition-all duration-300
          "
            >
              ✎ Edit Profile
            </button>
          </div>

          {/* ===== PERSONAL INFO + ADDRESS ===== */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-14">
            <Section title="Personal Information">
              <Input label="First Name" />
              <Input label="Last Name" />
              <Input label="Email Address" />
              <Input label="Phone Number" />
            </Section>

            <Section title="Address">
              <Input label="Country" />
              <Input label="State" />
              <Input label="Zip Code" />
              <Input label="Apartment / Street" />
            </Section>
          </div>

          {/* ===== PROFESSIONAL DETAILS ===== */}
          <div>
            <SectionTitle title="Professional Details" />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input label="Current Role" />
              <Input label="Experience (Years)" />
              <Input label="Expected Salary" />
              <Input label="Preferred Job Location" />

              <Input label="Skills (React, Node, MongoDB)" full />
              <Input label="Resume URL" full />
              <Input label="LinkedIn URL" full />
              <Input label="Portfolio / GitHub URL" full />

              <Textarea label="About Yourself" />
            </div>
          </div>

          {/* ===== ADDITIONAL INFO ===== */}
          <div>
            <SectionTitle title="Additional Information" />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input label="Notice Period" />
              <Input label="Employment Type (Full-time / Remote)" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

/* ===== SECTION WRAPPER ===== */

const Section = ({ title, children }) => (
  <div>
    <SectionTitle title={title} />
    <div className="space-y-5">{children}</div>
  </div>
);

const SectionTitle = ({ title }) => (
  <>
    <h4 className="font-semibold text-2xl text-black mb-2">{title}</h4>
    <div className="w-12 h-1 bg-[#309689] rounded mb-6"></div>
  </>
);

/* ===== INPUT ===== */

const Input = ({ label, full }) => (
  <div className={full ? "md:col-span-2" : ""}>
    <label className="block text-sm mb-1 text-gray-600">{label}</label>
    <input
      type="text"
      className="
        w-full px-4 py-3 rounded-lg
        border border-gray-300
        transition-all duration-300
        hover:border-black hover:font-medium
        focus:border-[#309689] focus:ring-1 focus:ring-[#309689]
        shadow-sm
      "
    />
  </div>
);

const Textarea = ({ label }) => (
  <div className="md:col-span-2">
    <label className="block text-sm mb-1 text-gray-600">{label}</label>
    <textarea
      rows="4"
      className="
        w-full px-4 py-3 rounded-lg
        border border-gray-300
        transition-all duration-300
        hover:border-black hover:font-medium
        focus:border-[#309689] focus:ring-1 focus:ring-[#309689]
        shadow-sm resize-none
      "
    />
  </div>
);

export default CandidateProfile;
