import { useEffect, useState } from "react";
import {
  useGetProfileQuery,
  useUpdateProfileMutation,
  
} from "../../services/endpoints/employerApi";
import { useChangeEmployerPasswordMutation } from "../../services/endpoints/authApi";

const Settings = () => {
  const { data: profile, isLoading, error } = useGetProfileQuery();
  const [updateProfile] = useUpdateProfileMutation();
  const [changePassword] = useChangeEmployerPasswordMutation();

  const [company, setCompany] = useState({
    name: "",
    email: "",
    phone: "",
    website: "",
    location: "",
  });

  const [password, setPassword] = useState({
    current: "",
    new: "",
    confirm: "",
  });

  // const [notifications, setNotifications] = useState({
  //   email: true,
  //   sms: false,
  //   jobAlerts: true,
  // });

  useEffect(() => {
    if (profile) {
      setCompany({
        name: profile.companyName || "",
        email: profile.contactEmail || "",
        phone: profile.contactPhone || "",
        website: profile.website || "",
        location: profile.location || "",
      });
    }
  }, [profile]);

  const handleCompanyChange = (e) => {
    setCompany({ ...company, [e.target.name]: e.target.value });
  };

  const handlePasswordChange = (e) => {
    setPassword({ ...password, [e.target.name]: e.target.value });
  };

  // const toggleNotification = (key) => {
  //   setNotifications({ ...notifications, [key]: !notifications[key] });
  // };

  const handleSaveCompany = async () => {
    try {
      await updateProfile({
        companyName: company.name,
        contactEmail: company.email,
        contactPhone: company.phone,
        website: company.website,
        location: company.location,
      }).unwrap();

      alert("Profile updated successfully");
    } catch (err) {
      alert(err?.data?.message || "Profile update failed");
    }
  };

  const handlePasswordUpdate = async () => {
    if (password.new !== password.confirm) {
      return alert("Passwords do not match");
    }

    try {
      await changePassword({
        currentPassword: password.current,
        newPassword: password.new,
      }).unwrap();

      alert("Password updated successfully");
      setPassword({ current: "", new: "", confirm: "" });
    } catch (err) {
      alert(err?.data?.message || "Password update failed");
    }
  };

  if (isLoading) return <p>Loading profile...</p>;
  if (error) return <p className="text-red-500">Failed to load profile</p>;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold">Settings</h1>
        <p className="text-gray-500">
          Manage your company profile and account preferences
        </p>
      </div>

      <div className="card">
        <h2 className="text-lg font-semibold mb-4">Company Profile</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input label="Company Name" name="name" value={company.name} onChange={handleCompanyChange} />
          <Input label="Email" name="email" value={company.email} onChange={handleCompanyChange} />
          <Input label="Phone" name="phone" value={company.phone} onChange={handleCompanyChange} />
          <Input label="Website" name="website" value={company.website} onChange={handleCompanyChange} />
          <Input label="Location" name="location" value={company.location} onChange={handleCompanyChange} />
        </div>

        <div className="mt-4 flex justify-end">
          <button className="btn-primary" onClick={handleSaveCompany}>
            Save Changes
          </button>
        </div>
      </div>

      <div className="card">
        <h2 className="text-lg font-semibold mb-4">Change Password</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input type="password" label="Current Password" name="current" value={password.current} onChange={handlePasswordChange} />
          <Input type="password" label="New Password" name="new" value={password.new} onChange={handlePasswordChange} />
          <Input type="password" label="Confirm Password" name="confirm" value={password.confirm} onChange={handlePasswordChange} />
        </div>

        <div className="mt-4 flex justify-end">
          <button className="btn-primary" onClick={handlePasswordUpdate}>
            Update Password
          </button>
        </div>
      </div>

      {/* <div className="card">
        <h2 className="text-lg font-semibold mb-4">Notification Preferences</h2>

        <div className="space-y-4">
          <Toggle label="Email Notifications" value={notifications.email} onChange={() => toggleNotification("email")} />
          <Toggle label="SMS Notifications" value={notifications.sms} onChange={() => toggleNotification("sms")} />
          <Toggle label="Job Application Alerts" value={notifications.jobAlerts} onChange={() => toggleNotification("jobAlerts")} />
        </div>
      </div> */}
    </div>
  );
};


const Input = ({ label, name, value, onChange, type = "text" }) => (
  <div>
    <label className="block text-sm text-gray-600 mb-1">{label}</label>
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
