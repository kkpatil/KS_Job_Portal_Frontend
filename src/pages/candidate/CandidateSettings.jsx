import { useEffect, useState } from "react";
import {
  useGetCandidateProfileQuery,
  useUpdateCandidateProfileMutation,
  useUploadResumeMutation,
} from "../../services/endpoints/candidate/profileApi";
import { useChangeEmployerPasswordMutation } from "../../services/endpoints/authApi";
import { toast } from "react-toastify";
import { FiEye, FiEyeOff } from "react-icons/fi";

const CandidateSettings = () => {
  const { data, isLoading } = useGetCandidateProfileQuery();
  const [updateProfile] = useUpdateCandidateProfileMutation();
  const [uploadResume] = useUploadResumeMutation();
  const [changePassword] = useChangeEmployerPasswordMutation();

  const [profile, setProfile] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const [resume, setResume] = useState(null);

  const [password, setPassword] = useState({
    current: "",
    new: "",
    confirm: "",
  });
  const [showPassword, setShowPassword] = useState({
    current: false,
    new: false,
    confirm: false,
  });

  const [notifications, setNotifications] = useState({
    jobAlerts: true,
    applicationUpdates: true,
    recruiterMessages: false,
  });

  useEffect(() => {
    if (data?.data) {
      const user = data.data;

      setProfile({
        name: user.name || "",
        email: user.email || "",
        phone: user.phone || "",
      });

      setNotifications({
        jobAlerts: user.notifications?.jobAlerts ?? true,
        applicationUpdates: user.notifications?.applicationUpdates ?? true,
        recruiterMessages: user.notifications?.recruiterMessages ?? false,
      });
    }
  }, [data]);

  if (isLoading) return <p>Loading...</p>;

  const handleProfileSave = async () => {
    await updateProfile({
      name: profile.name,
      phone: profile.phone,
    });
    toast.success("Profile updated successfully");
  };

  const handleResumeUpload = async () => {
    if (!resume) return toast.warning("Please select a file");

    const formData = new FormData();
    formData.append("resume", resume);

    await uploadResume(formData);
    toast.success("Resume uploaded successfully");
  };

  const handlePasswordChange = async () => {
    if (password.new !== password.confirm) {
      return toast.warning("Passwords do not match");
    }

    await changePassword({
      currentPassword: password.current,
      newPassword: password.new,
    });

    toast.success("Password updated");
    setPassword({ current: "", new: "", confirm: "" });
  };

  // const handleNotificationSave = async () => {
  //   await updateNotifications(notifications);
  //   alert("Notification preferences saved");
  // };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold">Settings</h1>
        <p className="text-gray-500">
          Manage your profile, resume and preferences
        </p>
      </div>

      <div className="card space-y-4">
        <h2 className="text-lg font-semibold">Profile Information</h2>

        <Input
          label="Full Name"
          value={profile.name}
          onChange={(e) => setProfile({ ...profile, name: e.target.value })}
          placeholder="e.g. Aakash Sharma"
        />

        <Input
          label="Email"
          value={profile.email}
          disabled
          placeholder="e.g. aakash@email.com"
        />

        <Input
          label="Phone Number"
          value={profile.phone}
          onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
          placeholder="e.g. 9876543210"
        />

        <button className="btn-primary" onClick={handleProfileSave}>
          Save Profile
        </button>
      </div>

      {/* <div className="card space-y-4">
        <h2 className="text-lg font-semibold">Resume</h2>

        <input
          type="file"
          accept=".pdf,.doc,.docx"
          onChange={(e) => setResume(e.target.files[0])}
          className="border rounded-lg px-3 py-2 text-sm"
        />

        {resume && (
          <p className="text-sm text-green-600">Selected: {resume.name}</p>
        )}

        <button className="btn-primary" onClick={handleResumeUpload}>
          Upload Resume
        </button>
      </div> */}

      <div className="card space-y-4">
        <h2 className="text-lg font-semibold">Change Password</h2>

        <Input
          type="password"
          label="Current Password"
          value={password.current}
          onChange={(e) =>
            setPassword({ ...password, current: e.target.value })
          }
          placeholder="Current password"
          showToggle
          show={showPassword.current}
          onToggle={() =>
            setShowPassword((s) => ({ ...s, current: !s.current }))
          }
        />

        <Input
          type="password"
          label="New Password"
          value={password.new}
          onChange={(e) => setPassword({ ...password, new: e.target.value })}
          placeholder="New password (min 8 chars)"
          showToggle
          show={showPassword.new}
          onToggle={() => setShowPassword((s) => ({ ...s, new: !s.new }))}
        />

        <Input
          type="password"
          label="Confirm New Password"
          value={password.confirm}
          onChange={(e) =>
            setPassword({ ...password, confirm: e.target.value })
          }
          placeholder="Re-enter new password"
          showToggle
          show={showPassword.confirm}
          onToggle={() =>
            setShowPassword((s) => ({ ...s, confirm: !s.confirm }))
          }
        />

        <button className="btn-primary" onClick={handlePasswordChange}>
          Update Password
        </button>
      </div>

      {/* <div className="card space-y-4">
        <h2 className="text-lg font-semibold">
          Notification Preferences
        </h2>

        <Toggle
          label="Job Alerts"
          checked={notifications.jobAlerts}
          onChange={() =>
            setNotifications({
              ...notifications,
              jobAlerts: !notifications.jobAlerts,
            })
          }
        />

        <Toggle
          label="Application Updates"
          checked={notifications.applicationUpdates}
          onChange={() =>
            setNotifications({
              ...notifications,
              applicationUpdates:
                !notifications.applicationUpdates,
            })
          }
        />

        <Toggle
          label="Recruiter Messages"
          checked={notifications.recruiterMessages}
          onChange={() =>
            setNotifications({
              ...notifications,
              recruiterMessages:
                !notifications.recruiterMessages,
            })
          }
        />

        <button className="btn-primary" onClick={handleNotificationSave}>
          Save Preferences
        </button>
      </div> */}
    </div>
  );
};

const Input = ({
  label,
  value,
  onChange,
  type = "text",
  disabled = false,
  placeholder,
  showToggle = false,
  show = false,
  onToggle,
}) => (
  <div className="relative">
    <label className="block text-sm mb-1 text-gray-600">{label}</label>
    <input
      type={showToggle ? (show ? "text" : "password") : type}
      value={value}
      disabled={disabled}
      onChange={onChange}
      placeholder={placeholder || label}
      className={`w-full border px-4 py-2 rounded-lg text-sm ${
        disabled ? "bg-gray-100 cursor-not-allowed" : ""
      } ${showToggle ? "pr-10" : ""}`}
    />
    {showToggle && (
      <button
        type="button"
        onClick={onToggle}
        className="absolute right-3 top-[34px] text-gray-500 hover:text-gray-700"
        aria-label={show ? "Hide password" : "Show password"}
      >
        {show ? <FiEyeOff /> : <FiEye />}
      </button>
    )}
  </div>
);

const Toggle = ({ label, checked, onChange }) => (
  <div className="flex justify-between items-center">
    <span className="text-sm">{label}</span>
    <button
      onClick={onChange}
      className={`w-12 h-6 flex items-center rounded-full p-1 transition ${
        checked ? "bg-indigo-600" : "bg-gray-300"
      }`}
    >
      <span
        className={`bg-white w-4 h-4 rounded-full transform transition ${
          checked ? "translate-x-6" : ""
        }`}
      />
    </button>
  </div>
);

export default CandidateSettings;
