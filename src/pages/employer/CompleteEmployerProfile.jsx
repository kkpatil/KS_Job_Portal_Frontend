import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCompleteEmployerProfileMutation } from "../../services/endpoints/employerApi";
import { toast } from "react-toastify";

const CompleteEmployerProfile = () => {
  const navigate = useNavigate();
  const [completeProfile, { isLoading }] = useCompleteEmployerProfileMutation();

  const [form, setForm] = useState({
    companyName: "",
    industry: "",
    companySize: "",
    website: "",
    description: "",
    contactName: "",
    contactRole: "",
    contactEmail: "",
    contactPhone: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await completeProfile(form).unwrap();
    
    if (res.error) return toast.error(res.error);
    toast.success("Profile completed successfully");
    localStorage.setItem("token", res.token);

    navigate("/employer", { replace: true });
  };

  return (
    <div className="min-h-screen py-12 px-4 flex justify-center bg-gradient-to-br from-black via-[#0f1f1c] to-black">
      <div className="w-full max-w-6xl bg-white rounded-3xl shadow-[0_20px_60px_rgba(48,150,137,0.25)] overflow-hidden">
        {/* Header */}
        <div className="px-8 py-6 border-b">
          <h2 className="text-2xl font-semibold text-black">
            Complete Your Company Profile
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            This information helps candidates and admins understand your company
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-8 md:p-10 space-y-12">
          {/* Company Info */}
          <div>
            <h3 className="text-2xl font-semibold text-black mb-2">
              Company Information
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                name="companyName"
                label="Company Name"
                onChange={handleChange}
                placeholder="e.g. Acme Technologies"
                required
              />
              <Input
                name="industry"
                label="Industry"
                onChange={handleChange}
                placeholder="e.g. IT Services"
              />
              <Input
                name="companySize"
                label="Company Size"
                onChange={handleChange}
                placeholder="e.g. 51-200"
              />
              <Input
                name="website"
                label="Website"
                onChange={handleChange}
                placeholder="e.g. https://company.com"
              />
            </div>

            <div className="mt-4">
              <Label text="About Company" />
              <textarea
                name="description"
                onChange={handleChange}
                rows={4}
                className="
    w-full px-4 py-3 rounded-lg
    border border-gray-300
    text-black placeholder-gray-400
    transition-all duration-300
    hover:border-black
    focus:border-[#309689]
    focus:ring-1 focus:ring-[#309689]
    shadow-sm resize-none
  "
                placeholder="Brief description about your company..."
              />
            </div>
          </div>

          {/* Divider */}
          <hr />

          {/* Contact Info */}
          <div>
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">
              Employer Contact Details
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                name="contactName"
                label="Contact Person Name"
                onChange={handleChange}
                placeholder="e.g. Neha Verma"
                required
              />
              <Input
                name="contactRole"
                label="Role / Designation"
                onChange={handleChange}
                placeholder="e.g. HR Manager"
              />
              <Input
                name="contactEmail"
                label="Contact Email"
                onChange={handleChange}
                placeholder="e.g. hr@company.com"
                required
              />
              <Input
                name="contactPhone"
                label="Contact Phone"
                onChange={handleChange}
                placeholder="e.g. 9876543210"
                required
              />
            </div>
          </div>

          {/* Action */}
          <div className="flex justify-end">
            <button
              disabled={isLoading}
              className="
    px-8 py-3 rounded-lg
    bg-[#309689] text-white font-medium
    hover:bg-black hover:scale-105
    transition-all duration-300
    disabled:opacity-60
  "
            >
              {isLoading ? "Saving..." : "Save & Continue"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CompleteEmployerProfile;

/* ---------- Reusable UI Helpers ---------- */

const Label = ({ text }) => (
  <label className="block text-sm font-medium text-gray-700 mb-1">{text}</label>
);

const Input = ({ label, name, onChange, required, placeholder }) => (
  <div>
    <Label text={label} />
    <input
      name={name}
      required={required}
      onChange={onChange}
      placeholder={placeholder || label}
      className="
    w-full px-4 py-3 rounded-lg
    border border-gray-300
    text-black placeholder-gray-400
    transition-all duration-300
    hover:border-black
    focus:border-[#309689]
    focus:ring-1 focus:ring-[#309689]
    shadow-sm
  "
    />
  </div>
);
