import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCompleteEmployerProfileMutation } from "../../services/endpoints/employerApi";

const CompleteEmployerProfile = () => {
  const navigate = useNavigate();
  const [completeProfile, { isLoading }] =
    useCompleteEmployerProfileMutation();

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


  localStorage.setItem("token", res.token);

  navigate("/employer", { replace: true });
};


  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center px-4">
      <div className="w-full max-w-4xl bg-white rounded-2xl shadow-xl overflow-hidden">
        
        {/* Header */}
        <div className="bg-[#309689] px-8 py-6 text-white">
          <h2 className="text-2xl font-bold">
            Complete Your Company Profile
          </h2>
          <p className="text-sm opacity-90 mt-1">
            This information helps candidates and admins understand your company
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-8 space-y-8">

          {/* Company Info */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Company Information
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input name="companyName" label="Company Name" onChange={handleChange} required />
              <Input name="industry" label="Industry" onChange={handleChange} />
              <Input name="companySize" label="Company Size" onChange={handleChange} />
              <Input name="website" label="Website" onChange={handleChange} />
            </div>

            <div className="mt-4">
              <Label text="About Company" />
              <textarea
                name="description"
                onChange={handleChange}
                rows={4}
                className="w-full rounded-lg border px-4 py-2 focus:ring-2 focus:ring-[#309689] outline-none"
                placeholder="Brief description about your company..."
              />
            </div>
          </div>

          {/* Divider */}
          <hr />

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Employer Contact Details
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input name="contactName" label="Contact Person Name" onChange={handleChange} required />
              <Input name="contactRole" label="Role / Designation" onChange={handleChange} />
              <Input name="contactEmail" label="Contact Email" onChange={handleChange} required />
              <Input name="contactPhone" label="Contact Phone" onChange={handleChange} required />
            </div>
          </div>

          {/* Action */}
          <div className="flex justify-end">
            <button
              disabled={isLoading}
              className="px-8 py-2 rounded-lg bg-[#309689] text-white font-medium
              hover:bg-[#257d73] transition disabled:opacity-60"
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
  <label className="block text-sm font-medium text-gray-700 mb-1">
    {text}
  </label>
);

const Input = ({ label, name, onChange, required }) => (
  <div>
    <Label text={label} />
    <input
      name={name}
      required={required}
      onChange={onChange}
      className="w-full rounded-lg border px-4 py-2
      focus:ring-2 focus:ring-[#309689] outline-none"
      placeholder={label}
    />
  </div>
);
