import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
  useGetProfileQuery,
  useUpdateProfileMutation,
} from "../../services/endpoints/employerApi";

const CompanyProfile = () => {
  const { data: profile, isLoading, error, refetch } = useGetProfileQuery();
  const [updateProfile, { isLoading: saving }] = useUpdateProfileMutation();

  const [form, setForm] = useState({
    companyName: "",
    industry: "",
    companySize: "",
    website: "",
    description: "",
    companyLocation: "",
    contactName: "",
    contactRole: "",
    contactEmail: "",
    contactPhone: "",
  });

  useEffect(() => {
    if (profile) {
      setForm({
        companyName: profile.companyName || "",
        industry: profile.industry || "",
        companySize: profile.companySize || "",
        website: profile.website || "",
        description: profile.description || "",
        companyLocation: profile.companyLocation || "",
        contactName: profile.contactName || "",
        contactRole: profile.contactRole || "",
        contactEmail: profile.contactEmail || "",
        contactPhone: profile.contactPhone || "",
      });
    }
  }, [profile]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    try {
      await updateProfile(form).unwrap();
      toast.success("Profile updated successfully");
      refetch();
    } catch (err) {
      toast.error(err?.data?.message || "Profile update failed");
    }
  };

  if (isLoading) return <p>Loading profile...</p>;
  if (error) return <p className="text-red-500">Failed to load profile</p>;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold">Company Profile</h1>
        <p className="text-gray-500">
          Update your company details visible to candidates
        </p>
      </div>

      <div className="card">
        <h2 className="text-lg font-semibold mb-4">Company Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Company Name"
            name="companyName"
            value={form.companyName}
            onChange={handleChange}
            placeholder="e.g. Acme Technologies"
          />
          <Input
            label="Industry"
            name="industry"
            value={form.industry}
            onChange={handleChange}
            placeholder="e.g. IT Services"
          />
          <Input
            label="Company Size"
            name="companySize"
            value={form.companySize}
            onChange={handleChange}
            placeholder="e.g. 51-200"
          />
          <Input
            label="Website"
            name="website"
            value={form.website}
            onChange={handleChange}
            placeholder="e.g. https://company.com"
          />
          <Input
            label="Company Location"
            name="companyLocation"
            value={form.companyLocation}
            onChange={handleChange}
            placeholder="e.g. Pune, India"
          />
        </div>

        <div className="mt-4">
          <Label text="About Company" />
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            rows={4}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 text-black placeholder-gray-400 transition-all duration-300 hover:border-black focus:border-[#309689] focus:ring-1 focus:ring-[#309689] shadow-sm resize-none"
            placeholder="Brief description about your company..."
          />
        </div>
      </div>

      <div className="card">
        <h2 className="text-lg font-semibold mb-4">Contact Details</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Contact Person Name"
            name="contactName"
            value={form.contactName}
            onChange={handleChange}
            placeholder="e.g. Neha Verma"
          />
          <Input
            label="Role / Designation"
            name="contactRole"
            value={form.contactRole}
            onChange={handleChange}
            placeholder="e.g. HR Manager"
          />
          <Input
            label="Contact Email"
            name="contactEmail"
            value={form.contactEmail}
            onChange={handleChange}
            placeholder="e.g. hr@company.com"
          />
          <Input
            label="Contact Phone"
            name="contactPhone"
            value={form.contactPhone}
            onChange={handleChange}
            placeholder="e.g. 9876543210"
          />
        </div>

        <div className="mt-4 flex justify-end">
          <button
            className="btn-primary"
            onClick={handleSave}
            disabled={saving}
          >
            {saving ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </div>
    </div>
  );
};

const Label = ({ text }) => (
  <label className="block text-sm font-medium text-gray-700 mb-1">
    {text}
  </label>
);

const Input = ({ label, name, value, onChange, placeholder }) => (
  <div>
    <Label text={label} />
    <input
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder || label}
      className="w-full px-4 py-2 rounded-lg border border-gray-300 text-black placeholder-gray-400 transition-all duration-300 hover:border-black focus:border-[#309689] focus:ring-1 focus:ring-[#309689] shadow-sm text-sm"
    />
  </div>
);

export default CompanyProfile;
