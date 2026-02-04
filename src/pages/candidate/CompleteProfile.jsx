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
    <div className="min-h-screen py-14 px-4 flex justify-center bg-gradient-to-br from-[#eae4e4] via-[#e6f0ef] to-[#ece3e3]">
      <div className="w-full max-w-6xl">
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-2xl shadow-md p-10 space-y-16"
        >
          {/* HEADER */}
          <div className="border-b pb-4">
            <h3 className="font-semibold text-2xl">
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
                required
              />
              <Input
                label="Last Name"
                name="lastName"
                value={form.lastName}
                onChange={handleChange}
              />
              <Input
                label="Phone Number"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                required
              />
            </Section>

            <Section title="Address">
              <Input
                label="Country"
                name="country"
                value={form.country}
                onChange={handleChange}
              />
              <Input
                label="State"
                name="state"
                value={form.state}
                onChange={handleChange}
              />
              <Input
                label="Zip Code"
                name="zipCode"
                value={form.zipCode}
                onChange={handleChange}
              />
              <Input
                label="Apartment / Street"
                name="address"
                value={form.address}
                onChange={handleChange}
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
              />
              <Input
                label="Experience"
                name="experience"
                value={form.experience}
                onChange={handleChange}
              />
              <Input
                label="Expected Salary"
                name="expectedSalary"
                value={form.expectedSalary}
                onChange={handleChange}
              />
              <Input
                label="Preferred Job Location"
                name="preferredLocation"
                value={form.preferredLocation}
                onChange={handleChange}
              />
              <Input
                label="Skills (comma separated)"
                name="skills"
                value={form.skills}
                onChange={handleChange}
                full
              />
              <Input
                label="LinkedIn URL"
                name="linkedin"
                value={form.linkedin}
                onChange={handleChange}
                full
              />
              <Input
                label="Portfolio / GitHub URL"
                name="portfolio"
                value={form.portfolio}
                onChange={handleChange}
                full
              />
              <Textarea
                label="About Yourself"
                name="about"
                value={form.about}
                onChange={handleChange}
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
              />
              <Input
                label="Employment Type"
                name="employmentType"
                value={form.employmentType}
                onChange={handleChange}
              />
              <Input
                label="Availability"
                name="availability"
                value={form.availability}
                onChange={handleChange}
              />
              <Input
                label="Willing to Relocate"
                name="relocate"
                value={form.relocate}
                onChange={handleChange}
              />
              <Input
                label="Preferred Shift"
                name="preferredShift"
                value={form.preferredShift}
                onChange={handleChange}
              />
              <Input
                label="Work Authorization"
                name="workAuthorization"
                value={form.workAuthorization}
                onChange={handleChange}
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

const Input = ({ label, name, value, onChange, required, full }) => (
  <div className={full ? "md:col-span-2" : ""}>
    <label className="block text-sm mb-1">{label}</label>
    <input
      name={name}
      value={value}
      onChange={onChange}
      required={required}
      className="w-full px-4 py-3 border rounded-lg"
    />
  </div>
);

const Textarea = ({ label, name, value, onChange }) => (
  <div className="md:col-span-2">
    <label className="block text-sm mb-1">{label}</label>
    <textarea
      name={name}
      value={value}
      onChange={onChange}
      rows="4"
      className="w-full px-4 py-3 border rounded-lg resize-none"
    />
  </div>
);

export default CompleteProfile;
