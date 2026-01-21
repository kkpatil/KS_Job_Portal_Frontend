import { useState } from "react";

const Settings = () => {
  /* ================= STATE ================= */
  const [company, setCompany] = useState({
    name: "TechNova Pvt Ltd",
    email: "hr@technova.com",
    phone: "+91 98765 43210",
    website: "https://technova.com",
    location: "Bangalore, India",
  });

  const [password, setPassword] = useState({
    current: "",
    new: "",
    confirm: "",
  });

  const [notifications, setNotifications] = useState({
    email: true,
    sms: false,
    jobAlerts: true,
  });

  /* ================= HANDLERS ================= */
  const handleCompanyChange = (e) => {
    setCompany({ ...company, [e.target.name]: e.target.value });
  };

  const handlePasswordChange = (e) => {
    setPassword({ ...password, [e.target.name]: e.target.value });
  };

  const toggleNotification = (key) => {
    setNotifications({ ...notifications, [key]: !notifications[key] });
  };

  return (
    <div className="space-y-8">
      {/* ================= HEADER ================= */}
      <div>
        <h1 className="text-2xl font-bold">Settings</h1>
        <p className="text-gray-500">
          Manage your company profile and account preferences
        </p>
      </div>

      {/* ================= COMPANY PROFILE ================= */}
      <div className="card">
        <h2 className="text-lg font-semibold mb-4">
          Company Profile
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Company Name"
            name="name"
            value={company.name}
            onChange={handleCompanyChange}
          />
          <Input
            label="Email"
            name="email"
            value={company.email}
            onChange={handleCompanyChange}
          />
          <Input
            label="Phone"
            name="phone"
            value={company.phone}
            onChange={handleCompanyChange}
          />
          <Input
            label="Website"
            name="website"
            value={company.website}
            onChange={handleCompanyChange}
          />
          <Input
            label="Location"
            name="location"
            value={company.location}
            onChange={handleCompanyChange}
          />
        </div>

        <div className="mt-4 flex justify-end">
          <button className="btn-primary">
            Save Changes
          </button>
        </div>
      </div>

      {/* ================= PASSWORD ================= */}
      <div className="card">
        <h2 className="text-lg font-semibold mb-4">
          Change Password
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            type="password"
            label="Current Password"
            name="current"
            value={password.current}
            onChange={handlePasswordChange}
          />
          <Input
            type="password"
            label="New Password"
            name="new"
            value={password.new}
            onChange={handlePasswordChange}
          />
          <Input
            type="password"
            label="Confirm Password"
            name="confirm"
            value={password.confirm}
            onChange={handlePasswordChange}
          />
        </div>

        <div className="mt-4 flex justify-end">
          <button className="btn-primary">
            Update Password
          </button>
        </div>
      </div>

      {/* ================= NOTIFICATIONS ================= */}
      <div className="card">
        <h2 className="text-lg font-semibold mb-4">
          Notification Preferences
        </h2>

        <div className="space-y-4">
          <Toggle
            label="Email Notifications"
            value={notifications.email}
            onChange={() => toggleNotification("email")}
          />
          <Toggle
            label="SMS Notifications"
            value={notifications.sms}
            onChange={() => toggleNotification("sms")}
          />
          <Toggle
            label="Job Application Alerts"
            value={notifications.jobAlerts}
            onChange={() => toggleNotification("jobAlerts")}
          />
        </div>
      </div>
    </div>
  );
};

/* ================= REUSABLE COMPONENTS ================= */

const Input = ({
  label,
  name,
  value,
  onChange,
  type = "text",
}) => (
  <div>
    <label className="block text-sm text-gray-600 mb-1">
      {label}
    </label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      className="w-full border px-4 py-2 rounded-lg text-sm"
    />
  </div>
);

const Toggle = ({ label, value, onChange }) => (
  <div className="flex justify-between items-center border rounded-lg p-4">
    <span className="text-sm">{label}</span>
    <button
      onClick={onChange}
      className={`w-12 h-6 rounded-full flex items-center px-1 transition ${
        value ? "bg-green-500" : "bg-gray-300"
      }`}
    >
      <span
        className={`w-4 h-4 bg-white rounded-full transform transition ${
          value ? "translate-x-6" : ""
        }`}
      />
    </button>
  </div>
);

export default Settings;
