import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useComplateCandidateProfileMutation } from "../../services/endpoints/candidate/profileApi";
import { toast } from "react-toastify";

const CompleteProfile = () => {
  const navigate = useNavigate();
  const [profileComplate, { isLoading }] =
    useComplateCandidateProfileMutation();

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    phone: "",

    country: "",
    state: "",
    zipCode: "",
    address: "",

    currentRole: "",
    experience: "",
    expectedSalary: "",
    preferredLocation: "",

    skills: "",
    about: "",

    linkedin: "",
    portfolio: "",

    noticePeriod: "",
    employmentType: "",
    availability: "",
    relocate: "",
    preferredShift: "",
    workAuthorization: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await profileComplate(form).unwrap();
      toast.success("Profile completed successfully");
      navigate("/candidate", { replace: true });
    } catch (error) {
      toast.error(error?.data?.message || "Failed to complete profile");
    }
  };

  return (
    <div className="min-h-screen py-12 px-4 flex justify-center bg-gradient-to-br from-black via-[#0f1f1c] to-black">
      <div className="w-full max-w-6xl">
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-3xl shadow-[0_20px_60px_rgba(48,150,137,0.25)] p-8 md:p-10 space-y-12"
        >
          {/* HEADER */}
          <div className="border-b pb-4">
            <h3 className="font-semibold text-2xl text-gray-900">
              Complete Your Profile Details
            </h3>
            <p className="text-sm text-gray-500">
              This information helps employer understand your profile
            </p>
          </div>

          {/* PERSONAL INFO */}
          <div className="grid md:grid-cols-2 gap-10">
            <Section title="Personal Information">
              <Input
                label="First Name"
                name="firstName"
                value={form.firstName}
                onChange={handleChange}
                placeholder="e.g. Aakash"
                required
              />
              <Input
                label="Last Name"
                name="lastName"
                value={form.lastName}
                onChange={handleChange}
                placeholder="e.g. Sharma"
              />
              <Input
                label="Phone Number"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                placeholder="e.g. 9876543210"
                required
              />
            </Section>

            <Section title="Address">
              <Input
                label="Country"
                name="country"
                value={form.country}
                onChange={handleChange}
                placeholder="e.g. India"
              />
              <Input
                label="State"
                name="state"
                value={form.state}
                onChange={handleChange}
                placeholder="e.g. Maharashtra"
              />
              <Input
                label="Zip Code"
                name="zipCode"
                value={form.zipCode}
                onChange={handleChange}
                placeholder="e.g. 411001"
              />
              <Input
                label="Apartment / Street"
                name="address"
                value={form.address}
                onChange={handleChange}
                placeholder="e.g. 21, MG Road"
              />
            </Section>
          </div>

          {/* PROFESSIONAL */}
          <div>
            <SectionTitle title="Professional Details" />
            <div className="grid md:grid-cols-2 gap-6">
              <Input
                label="Current Role"
                name="currentRole"
                value={form.currentRole}
                onChange={handleChange}
                placeholder="e.g. Frontend Developer"
              />
              <Input
                label="Experience"
                name="experience"
                value={form.experience}
                onChange={handleChange}
                placeholder="e.g. 3 years"
              />
              <Input
                label="Expected Salary"
                name="expectedSalary"
                value={form.expectedSalary}
                onChange={handleChange}
                placeholder="e.g. 800000"
              />
              <Input
                label="Preferred Job Location"
                name="preferredLocation"
                value={form.preferredLocation}
                onChange={handleChange}
                placeholder="e.g. Remote, Pune"
              />
              <Input
                label="Skills (comma separated)"
                name="skills"
                value={form.skills}
                onChange={handleChange}
                placeholder="e.g. React, Node, MongoDB"
                full
              />
              <Input
                label="LinkedIn URL"
                name="linkedin"
                value={form.linkedin}
                onChange={handleChange}
                placeholder="e.g. https://linkedin.com/in/yourname"
                full
              />
              <Input
                label="Portfolio / GitHub URL"
                name="portfolio"
                value={form.portfolio}
                onChange={handleChange}
                placeholder="e.g. https://github.com/yourname"
                full
              />
              <Textarea
                label="About Yourself"
                name="about"
                value={form.about}
                onChange={handleChange}
                placeholder="Brief summary about your experience and goals"
              />
            </div>
          </div>

          {/* ADDITIONAL */}
          <div>
            <SectionTitle title="Additional Information" />
            <div className="grid md:grid-cols-2 gap-6">
              <Input
                label="Notice Period"
                name="noticePeriod"
                value={form.noticePeriod}
                onChange={handleChange}
                placeholder="e.g. 15 days"
              />
              <Input
                label="Employment Type"
                name="employmentType"
                value={form.employmentType}
                onChange={handleChange}
                placeholder="e.g. Full-time"
              />
              <Input
                label="Availability"
                name="availability"
                value={form.availability}
                onChange={handleChange}
                placeholder="e.g. Immediate"
              />
              <Input
                label="Willing to Relocate"
                name="relocate"
                value={form.relocate}
                onChange={handleChange}
                placeholder="e.g. Yes / No"
              />
              <Input
                label="Preferred Shift"
                name="preferredShift"
                value={form.preferredShift}
                onChange={handleChange}
                placeholder="e.g. Day shift"
              />
              <Input
                label="Work Authorization"
                name="workAuthorization"
                value={form.workAuthorization}
                onChange={handleChange}
                placeholder="e.g. India"
              />
            </div>
          </div>

          {/* SAVE */}
          <div className="flex justify-end">
            <button
              disabled={isLoading}
              className="px-10 py-3 bg-[#309689] text-white rounded-md"
            >
              {isLoading ? "Saving..." : "Save Changes"}
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
    <h4 className="font-semibold text-xl mb-2">{title}</h4>
    <div className="w-12 h-1 bg-[#309689] mb-6"></div>
  </>
);

const Input = ({
  label,
  name,
  value,
  onChange,
  required,
  full,
  placeholder,
}) => (
  <div className={full ? "md:col-span-2" : ""}>
    <label className="block text-sm mb-1">{label}</label>
    <input
      name={name}
      value={value}
      onChange={onChange}
      required={required}
      placeholder={placeholder || label}
      className="w-full px-4 py-3 border rounded-lg"
    />
  </div>
);

const Textarea = ({ label, name, value, onChange, placeholder }) => (
  <div className="md:col-span-2">
    <label className="block text-sm mb-1">{label}</label>
    <textarea
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder || label}
      rows="4"
      className="w-full px-4 py-3 border rounded-lg resize-none"
    />
  </div>
);

export default CompleteProfile;
