import { useEffect, useState } from "react";
import {
  PencilSquareIcon,
  DocumentArrowDownIcon,
  ArrowLeftIcon,
  XMarkIcon,
  PlusIcon,
} from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import {
  useGetCandidateProfileQuery,
  useUploadResumeMutation,
  useUpdateCandidateProfileMutation,
} from "../../services/endpoints/candidate/profileApi";

const API_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5000";

const Profile = () => {
  const { data, isLoading, refetch } =
    useGetCandidateProfileQuery();

  const [uploadResume, { isLoading: uploading }] =
    useUploadResumeMutation();

  const [updateProfile, { isLoading: saving }] =
    useUpdateCandidateProfileMutation();

  /* ================= STATE ================= */
  const [editMode, setEditMode] = useState(false);
  const [skillInput, setSkillInput] = useState("");

  const [form, setForm] = useState({
    name: "",
    location: "",
    skills: [],
  });

  const user = data?.data;

  /* ================= PREFILL ================= */
  useEffect(() => {
    if (user) {
      setForm({
        name: user.name || "",
        location: user.location || "",
        skills: user.skills || [],
      });
    }
  }, [user]);

  if (isLoading) return <p>Loading...</p>;

  /* ================= HANDLERS ================= */

  const handleSaveProfile = async () => {
    try {
      await updateProfile(form).unwrap();
      await refetch();
      setEditMode(false);
      alert("Profile updated successfully");
    } catch {
      alert("Profile update failed");
    }
  };

  const handleAddSkill = () => {
    const skill = skillInput.trim();
    if (!skill) return;
    if (form.skills.includes(skill)) return;

    setForm({
      ...form,
      skills: [...form.skills, skill],
    });
    setSkillInput("");
  };

  const handleRemoveSkill = (skill) => {
    setForm({
      ...form,
      skills: form.skills.filter((s) => s !== skill),
    });
  };

  const handleResumeUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("resume", file);

    await uploadResume(formData).unwrap();
    refetch();
  };

  const resumeUrl =
    user?.resume && API_URL
      ? `${API_URL.replace(/\/$/, "")}/${user.resume}`
      : null;

  return (
    <div className="space-y-6 py-2">
      {/* HEADER */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">My Profile</h1>
          <p className="text-gray-500">
            View and manage your profile
          </p>
        </div>

        <div className="flex  gap-3">
          <Link to={-1} className="btn-primary flex items-center gap-1">
            <ArrowLeftIcon className="w-4 h-4 " /> Back
          </Link>

          {!editMode ? (
            <button
              className="btn-secondary flex gap-1 transition hover:scale-102"
              onClick={() => setEditMode(true)}
            >
              <PencilSquareIcon className="w-4 h-4" /> Edit
            </button>
          ) : (
            <button
              className="btn-secondary flex gap-1"
              onClick={() => setEditMode(false)}
            >
              <XMarkIcon className="w-4 h-4" /> Cancel
            </button>
          )}
        </div>
      </div>

      {/* BASIC INFO */}
      <div className="card flex gap-6">
        <div className="w-24 h-24 rounded-full bg-indigo-100 flex items-center justify-center text-3xl font-bold text-indigo-600">
          {user?.name?.charAt(0)}
        </div>

        <div className="w-full space-y-3">
          {!editMode ? (
            <>
              <h2 className="text-xl font-semibold">
                {user?.name}
              </h2>
              <p className="text-gray-500">{user?.email}</p>
              <p>{user?.location || "India"}</p>

              <div className="flex gap-2 flex-wrap mt-2">
                {user?.skills?.length > 0 ? (
                  user.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-xs"
                    >
                      {skill}
                    </span>
                  ))
                ) : (
                  <p className="text-sm text-gray-400">
                    No skills added
                  </p>
                )}
              </div>
            </>
          ) : (
            <>
              <Input
                label="Name"
                value={form.name}
                onChange={(e) =>
                  setForm({
                    ...form,
                    name: e.target.value,
                  })
                }
              />

              <Input
                label="Location"
                value={form.location}
                onChange={(e) =>
                  setForm({
                    ...form,
                    location: e.target.value,
                  })
                }
              />

              {/* SKILLS */}
              <div>
                <label className="text-sm text-gray-600">
                  Skills
                </label>

                <div className="flex gap-2 flex-wrap my-2">
                  {form.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-xs flex items-center gap-1"
                    >
                      {skill}
                      <XMarkIcon
                        className="w-4 h-4 cursor-pointer"
                        onClick={() =>
                          handleRemoveSkill(skill)
                        }
                      />
                    </span>
                  ))}
                </div>

                <div className="flex gap-2">
                  <input
                    value={skillInput}
                    onChange={(e) =>
                      setSkillInput(e.target.value)
                    }
                    placeholder="Add skill"
                    className="border px-3 py-2 rounded-lg text-sm"
                  />
                  <button
                    onClick={handleAddSkill}
                    className="btn-secondary"
                  >
                    <PlusIcon className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <button
                className="btn-primary mt-3"
                onClick={handleSaveProfile}
                disabled={saving}
              >
                {saving ? "Saving..." : "Save Changes"}
              </button>
            </>
          )}
        </div>
      </div>

      {/* RESUME */}
      <div className="card flex justify-between items-center">
        <div>
          <p className="font-medium">Resume</p>
          <p className="text-sm text-gray-500">
            {user?.resume
              ? user.resume.split("/").pop()
              : "Not uploaded"}
          </p>
        </div>

        <div className="flex gap-3">
          {resumeUrl && (
            <a
              href={resumeUrl}
              target="_blank"
              rel="noreferrer"
              className="btn-primary flex gap-1"
            >
              <DocumentArrowDownIcon className="w-4 h-4" />
              Download
            </a>
          )}

          <label className="btn-secondary cursor-pointer">
            {uploading ? "Uploading..." : "Upload"}
            <input
              type="file"
              hidden
              accept=".pdf,.doc,.docx"
              onChange={handleResumeUpload}
            />
          </label>
        </div>
      </div>
    </div>
  );
};

/* ================= REUSABLE INPUT ================= */

const Input = ({ label, value, onChange }) => (
  <div>
    <label className="text-sm text-gray-600">
      {label}
    </label>
    <input
      value={value}
      onChange={onChange}
      className="w-full border px-3 py-2 rounded-lg text-sm"
    />
  </div>
);

export default Profile;
