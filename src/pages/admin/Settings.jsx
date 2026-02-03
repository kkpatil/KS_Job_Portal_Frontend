import { useEffect, useState } from "react";
import {
  useGetSettingsQuery,
  useUpdateSettingsMutation,
} from "../../services/endpoints/settingsApi";
import { toast } from "react-toastify";


const Settings = () => {
  const { data, isLoading } = useGetSettingsQuery();
  const [updateSettings] = useUpdateSettingsMutation();

  const [settings, setSettings] = useState({
    siteName: "",
    supportEmail: "",
    allowEmployerRegistration: false,
    allowCandidateRegistration: false,
    maintenanceMode: false,
    defaultJobStatus: "Pending",
  });

  // ✅ FIX 1: correct data mapping
  useEffect(() => {
    if (data?.data) {
      setSettings((prev) => ({
        ...prev,
        ...data.data, // ✅ ONLY actual settings
      }));
    }
  }, [data]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSettings((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSave = async () => {
   try {
     await updateSettings(settings).unwrap();
     toast.success("Settings Saved");
   } catch (error) {
    toast.error("Failed to save settings");
   }
  };

  if (isLoading) return <p>Loading...</p>;

  return (
    <div className="space-y-6">
      {/* GENERAL */}
      <div className="card">
        <h2 className="text-xl font-semibold mb-4">General Settings</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">

        <Input
          label="Site Name"
          name="siteName"
          value={settings.siteName}
          onChange={handleChange}
          
        />

        <Input
          label="Support Email"
          name="supportEmail"
          value={settings.supportEmail}
          onChange={handleChange}
        />
        </div>
      </div>

      {/* USER */}
      <div className="card">
        <h2 className="text-xl font-semibold mb-4">User Settings</h2>

        {/* ✅ FIX 2: correct names */}
        <Toggle
          label="Allow Employer Registration"
          name="allowEmployerRegistration"
          checked={settings.allowEmployerRegistration}
          onChange={handleChange}
        />

        <Toggle
          label="Allow Candidate Registration"
          name="allowCandidateRegistration"
          checked={settings.allowCandidateRegistration}
          onChange={handleChange}
        />
      </div>

      {/* JOB */}
      <div className="card">
        <h2 className="text-xl font-semibold mb-4">Job Settings</h2>

        <Select
          label="Default Job Status"
          name="defaultJobStatus"
          value={settings.defaultJobStatus}
          onChange={handleChange}
          options={["Pending", "Active", "Blocked"]}
        />
      </div>

      {/* SYSTEM */}
      <div className="card">
        <h2 className="text-xl font-semibold mb-4">System</h2>

        <Toggle
          label="Maintenance Mode"
          name="maintenanceMode"
          checked={settings.maintenanceMode}
          onChange={handleChange}
        />
      </div>

      <div className="flex justify-end">
        <button onClick={handleSave} className="btn-primary px-8">
          Save Settings
        </button>
      </div>
    </div>
  );
};



export default Settings;

/* ================= SMALL COMPONENTS ================= */

const Input = ({ label, ...props }) => (
  <div>
    <label className="block text-sm font-medium mb-1">{label}</label>
    <input
      {...props}
      className="w-full border px-4 py-2 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
    />
  </div>
);

const Select = ({ label, options, ...props }) => (
  <div>
    <label className="block text-sm font-medium mb-1">{label}</label>
    <select
      {...props}
      className="w-full border px-4 py-2 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
    >
      {options.map((opt) => (
        <option key={opt} value={opt}>
          {opt}
        </option>
      ))}
    </select>
  </div>
);

const Toggle = ({ label, name, checked, onChange }) => (
  <div className="flex items-center justify-between py-2">
    <span className="text-sm">{label}</span>
    <input
      type="checkbox"
      name={name}
      checked={checked}
      onChange={onChange}
      className="w-5 h-5"
    />
  </div>
);
