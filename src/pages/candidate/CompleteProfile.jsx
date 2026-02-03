import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const CompleteProfile = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    firstName: "",
    email: "",
    phone: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // future me API yaha aayegi

    navigate("/candidate", { replace: true });
  };

  return (
    <div className="min-h-screen py-14 px-4 flex justify-center bg-gradient-to-br from-[#eae4e4] via-[#e6f0ef] to-[#ece3e3]">
      <div className="w-full max-w-6xl">
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-2xl shadow-md p-10 space-y-16 hover:shadow-2xl transition-all duration-300"
        >
          {/* ===== PROFILE TOP ===== */}
          <div className="flex items-center justify-between border-b pb-4">
            <div>
              <h3 className="font-semibold text-2xl text-black">
                Complete Your Profile Details
              </h3>
              <p className="text-sm text-gray-500 mt-1">
                This information helps Employer understand your profile
              </p>
            </div>

            <button
              type="button"
              className="px-6 py-2 rounded-md text-sm font-medium bg-[#309689] text-white hover:bg-black transition"
            >
              ✎ Edit Profile
            </button>
          </div>

          {/* ===== PERSONAL INFO + ADDRESS ===== */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-14">
            <Section title="Personal Information">
              <Input
                label="First Name"
                name="firstName"
                placeholder="Enter your first name"
                onChange={handleChange}
                required
              />
              <Input label="Last Name" placeholder="Enter your last name" />
              <Input
                label="Email Address"
                name="email"
                placeholder="example@email.com"
                onChange={handleChange}
                required
              />
              <Input
                label="Phone Number"
                name="phone"
                placeholder="+91 9XXXXXXXXX"
                onChange={handleChange}
                required
              />
            </Section>

            <Section title="Address">
              <Input label="Country" placeholder="India" />
              <Input label="State" placeholder="Madhya Pradesh" />
              <Input label="Zip Code" placeholder="452001" />
              <Input
                label="Apartment / Street"
                placeholder="Flat no, Street name"
              />
            </Section>
          </div>

          {/* ===== PROFESSIONAL DETAILS ===== */}
          <div>
            <SectionTitle title="Professional Details" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input label="Current Role" placeholder="Frontend Developer" />
              <Input label="Experience (Years)" placeholder="2 Years" />
              <Input
                label="Expected Salary"
                placeholder="₹6,00,000 per annum"
              />
              <Input
                label="Preferred Job Location"
                placeholder="Remote / Indore"
              />
              <Input
                label="Skills (React, Node, MongoDB)"
                placeholder="React, Node, MongoDB"
                full
              />
              <Input
                label="Resume URL"
                placeholder="https://drive.google.com/..."
                full
              />
              <Input
                label="LinkedIn URL"
                placeholder="https://linkedin.com/in/username"
                full
              />
              <Input
                label="Portfolio / GitHub URL"
                placeholder="https://github.com/username"
                full
              />
              <Textarea
                label="About Yourself"
                placeholder="Write a short professional summary about yourself..."
              />
            </div>
          </div>

          {/* ===== ADDITIONAL INFO ===== */}
          <div>
            <SectionTitle title="Additional Information" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input label="Notice Period" placeholder="15 Days / Immediate" />
              <Input
                label="Employment Type"
                placeholder="Full-time / Remote / Hybrid"
              />
              <Input
                label="Availability to Join"
                placeholder="Immediately / Within 30 Days"
              />
              <Input label="Willing to Relocate" placeholder="Yes / No" />
              <Input
                label="Preferred Shift"
                placeholder="Day / Night / Flexible"
              />
              <Input label="Work Authorization" placeholder="India / Other" />
            </div>
          </div>

          {/* ===== SAVE BUTTON ===== */}
          <div className="flex justify-end pt-6">
            <button
              type="submit"
              className="px-10 py-3 rounded-md bg-[#309689] text-white hover:bg-black hover:scale-105 transition-all duration-300 shadow-md"
            >
              Save & Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

/* ===== HELPERS ===== */

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

const Input = ({ label, placeholder, full, name, onChange, required }) => (
  <div className={full ? "md:col-span-2" : ""}>
    <label className="block text-sm mb-1 text-gray-600">{label}</label>
    <input
      name={name}
      required={required}
      onChange={onChange}
      placeholder={placeholder}
      className="w-full px-4 py-3 rounded-lg border border-gray-300 text-black focus:ring-1 focus:ring-[#309689]"
    />
  </div>
);

const Textarea = ({ label, placeholder }) => (
  <div className="md:col-span-2">
    <label className="block text-sm mb-1 text-gray-600">{label}</label>
    <textarea
      rows="4"
      placeholder={placeholder}
      className="w-full px-4 py-3 rounded-lg border border-gray-300 text-black focus:ring-1 focus:ring-[#309689] resize-none"
    />
  </div>
);

export default CompleteProfile;
