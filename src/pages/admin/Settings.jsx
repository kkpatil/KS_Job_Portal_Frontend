import { useState } from "react";

const Settings = () => {
  const [settings, setSettings] = useState({
    siteName: "Jobie Job Portal",
    supportEmail: "support@jobie.com",
    allowEmployerSignup: true,
    allowCandidateSignup: true,
    maintenanceMode: false,
    defaultJobStatus: "Pending",
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSettings({
      ...settings,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  return (
    <div className="space-y-6">
      {/* ================= GENERAL SETTINGS ================= */}
      <div className="card">
        <h2 className="text-xl font-semibold mb-4">General Settings</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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

      {/* ================= USER SETTINGS ================= */}
      <div className="card">
        <h2 className="text-xl font-semibold mb-4">User Settings</h2>

        <Toggle
          label="Allow Employer Registration"
          name="allowEmployerSignup"
          checked={settings.allowEmployerSignup}
          onChange={handleChange}
        />

        <Toggle
          label="Allow Candidate Registration"
          name="allowCandidateSignup"
          checked={settings.allowCandidateSignup}
          onChange={handleChange}
        />
      </div>

      {/* ================= JOB SETTINGS ================= */}
      <div className="card">
        <h2 className="text-xl font-semibold mb-4">Job Settings</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Select
            label="Default Job Status"
            name="defaultJobStatus"
            value={settings.defaultJobStatus}
            onChange={handleChange}
            options={["Pending", "Active", "Blocked"]}
          />
        </div>
      </div>

      {/* ================= SYSTEM SETTINGS ================= */}
      <div className="card">
        <h2 className="text-xl font-semibold mb-4">System Settings</h2>

        <Toggle
          label="Maintenance Mode"
          name="maintenanceMode"
          checked={settings.maintenanceMode}
          onChange={handleChange}
        />
      </div>

      {/* ================= SAVE BUTTON ================= */}
      <div className="flex justify-end">
        <button className="btn-primary px-8">
          Save Settings
        </button>
      </div>
    </div>
  );
};

/* ================= SMALL COMPONENTS ================= */

const Input = ({ label, ...props }) => (
  <div>
    <label className="block text-sm font-medium mb-1">
      {label}
    </label>
    <input
      {...props}
      className="w-full border px-4 py-2 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
    />
  </div>
);

const Select = ({ label, options, ...props }) => (
  <div>
    <label className="block text-sm font-medium mb-1">
      {label}
    </label>
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

export default Settings;
