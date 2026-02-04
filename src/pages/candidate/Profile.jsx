import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  useGetCandidateProfileQuery,
  useUploadResumeMutation,
  useUpdateCandidateProfileMutation,
} from "../../services/endpoints/candidate/profileApi";
import { toast } from "react-toastify";
import {
  FiArrowLeft,
  FiEdit2,
  FiX,
  FiPlus,
  FiDownload,
  FiPhone,
  FiMapPin,
  FiBriefcase,
  FiClock,
  FiGlobe,
  FiLink,
  FiExternalLink,
  FiUser,
  FiDollarSign,
} from "react-icons/fi";

const API_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5000";

const Profile = () => {
  const { data, isLoading, refetch } =
    useGetCandidateProfileQuery();

  const [uploadResume, { isLoading: uploading }] =
    useUploadResumeMutation();

  const [updateProfile, { isLoading: saving }] =
    useUpdateCandidateProfileMutation();

  const [editMode, setEditMode] = useState(false);
  const [skillInput, setSkillInput] = useState("");

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

    skills: [],
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

  const user = data?.data;

  /* ================= PREFILL ================= */
  useEffect(() => {
    if (user) {
      setForm({
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        phone: user.phone || "",

        country: user.country || "",
        state: user.state || "",
        zipCode: user.zipCode || "",
        address: user.address || "",

        currentRole: user.currentRole || "",
        experience: user.experience || "",
        expectedSalary: user.expectedSalary || "",
        preferredLocation: user.preferredLocation || "",

        skills: user.skills || [],
        about: user.about || "",

        linkedin: user.linkedin || "",
        portfolio: user.portfolio || "",

        noticePeriod: user.noticePeriod || "",
        employmentType: user.employmentType || "",
        availability: user.availability || "",
        relocate: user.relocate || "",
        preferredShift: user.preferredShift || "",
        workAuthorization: user.workAuthorization || "",
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
      toast.success("Profile updated successfully");
    } catch (err) {
      toast.error(
        err?.data?.message || "Profile update failed"
      );
    }
  };

  const handleAddSkill = () => {
    const skill = skillInput.trim();
    if (!skill || form.skills.includes(skill)) return;

    setForm({ ...form, skills: [...form.skills, skill] });
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

    try {
      await uploadResume(formData).unwrap();
      toast.success("Resume uploaded");
      refetch();
    } catch {
      toast.error("Resume upload failed");
    }
  };

  const resumeUrl =
    user?.resume && API_URL
      ? `${API_URL.replace(/\/$/, "")}/${user.resume}`
      : null;

  return (
    <div className="space-y-6 py-2">
      {/* HEADER */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-xs uppercase tracking-widest text-gray-500">
            Candidate Portal
          </p>
          <h1 className="text-2xl font-bold text-gray-900">
            My Profile
          </h1>
          <p className="text-gray-600">
            Keep your profile fresh to get better matches.
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <Link
            to={-1}
            className="btn-secondary flex items-center gap-2"
          >
            <FiArrowLeft className="h-4 w-4" /> Back
          </Link>

          {!editMode ? (
            <button
              className="btn-primary flex items-center gap-2"
              onClick={() => setEditMode(true)}
            >
              <FiEdit2 className="h-4 w-4" /> Edit Profile
            </button>
          ) : (
            <button
              className=" bg-gray-400 rounded-md p-2 text-white hover:scale-102 cursor-pointer flex items-center gap-2"
              onClick={() => setEditMode(false)}
            >
              <FiX className="h-4 w-4" /> Cancel
            </button>
          )}
        </div>
      </div>

      {/* PROFILE CARD */}
      <div className="card relative overflow-hidden bg-white">
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-indigo-50 via-white to-emerald-50 opacity-40" />
        {!editMode ? (
          <div className="relative">
            <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
              <div className="flex items-center gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-600 text-white">
                  <FiUser className="h-6 w-6" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-gray-900">
                    {user?.firstName} {user?.lastName}
                  </h2>
                  <p className="text-gray-700">{user?.email}</p>
                  <div className="mt-2 flex flex-wrap items-center gap-4 text-sm text-gray-700">
                    <span className="flex items-center gap-2">
                      <FiPhone /> {user?.phone || "Add phone"}
                    </span>
                    <span className="flex items-center gap-2">
                      <FiMapPin />
                      {user?.address
                        ? `${user?.address}, ${user?.state}, ${user?.country} - ${user?.zipCode}`
                        : "Add address"}
                    </span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 text-sm md:grid-cols-1">
                <div className="rounded-xl border border-gray-100 bg-white/90 px-4 py-3 shadow-sm">
                  <p className="text-xs uppercase tracking-wide text-gray-500">
                    Current Role
                  </p>
                  <p className="mt-1 font-medium text-gray-800">
                    {user?.currentRole || "Add role"}
                  </p>
                </div>
                <div className="rounded-xl border border-gray-100 bg-white/90 px-4 py-3 shadow-sm">
                  <p className="text-xs uppercase tracking-wide text-gray-500">
                    Experience
                  </p>
                  <p className="mt-1 font-medium text-gray-800">
                    {user?.experience || "Add experience"}
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-5 grid gap-4 md:grid-cols-3">
              <div className="rounded-2xl border border-gray-100 bg-white/90 px-4 py-4 shadow-sm">
                <p className="text-xs uppercase tracking-wide text-gray-500">
                  Preferred Location
                </p>
                <p className="mt-2 flex items-center gap-2 text-sm font-semibold text-gray-900">
                  <FiMapPin />{" "}
                  {user?.preferredLocation || "Not set"}
                </p>
              </div>
              <div className="rounded-2xl border border-gray-100 bg-white/90 px-4 py-4 shadow-sm">
                <p className="text-xs uppercase tracking-wide text-gray-500">
                  Expected Salary
                </p>
                <p className="mt-2 flex items-center gap-2 text-sm font-semibold text-gray-900">
                  <FiDollarSign /> ₹{user?.expectedSalary || "—"} / year
                </p>
              </div>
              <div className="rounded-2xl border border-gray-100 bg-white/90 px-4 py-4 shadow-sm">
                <p className="text-xs uppercase tracking-wide text-gray-500">
                  Availability
                </p>
                <p className="mt-2 flex items-center gap-2 text-sm font-semibold text-gray-900">
                  <FiClock /> {user?.availability || "Not set"}
                </p>
              </div>
            </div>

            <div className="mt-5">
              <p className="text-sm font-semibold text-gray-900">
                Skills
              </p>
              <div className="mt-2 flex flex-wrap gap-2">
                {user?.skills?.length ? (
                  user.skills.map((skill) => (
                    <span
                      key={skill}
                      className="rounded-full border border-indigo-200 bg-indigo-50 px-3 py-1 text-xs font-medium text-indigo-700"
                    >
                      {skill}
                    </span>
                  ))
                ) : (
                  <p className="text-sm text-gray-500">
                    No skills added yet
                  </p>
                )}
              </div>
            </div>

            {user?.about && (
              <div className="mt-5 rounded-2xl border border-gray-100 bg-white/90 px-4 py-4 text-sm text-gray-800 shadow-sm">
                <p className="mb-1 text-xs uppercase tracking-wide text-gray-500">
                  About
                </p>
                <p>{user.about}</p>
              </div>
            )}

            <div className="mt-5 grid gap-3 text-sm md:grid-cols-2">
              <div className="flex items-center gap-2 rounded-xl border border-gray-100 bg-white/90 px-3 py-2 text-gray-800 shadow-sm">
                <FiClock />
                <span>
                  Notice Period: {user?.noticePeriod || "Not set"}
                </span>
              </div>
              <div className="flex items-center gap-2 rounded-xl border border-gray-100 bg-white/90 px-3 py-2 text-gray-800 shadow-sm">
                <FiBriefcase />
                <span>
                  Employment: {user?.employmentType || "Not set"}
                </span>
              </div>
              <div className="flex items-center gap-2 rounded-xl border border-gray-100 bg-white/90 px-3 py-2 text-gray-800 shadow-sm">
                <FiClock />
                <span>
                  Shift: {user?.preferredShift || "Not set"}
                </span>
              </div>
              <div className="flex items-center gap-2 rounded-xl border border-gray-100 bg-white/90 px-3 py-2 text-gray-800 shadow-sm">
                <FiGlobe />
                <span>
                  Work Auth: {user?.workAuthorization || "India"}
                </span>
              </div>
            </div>

            <div className="mt-5 space-y-2 text-sm">
              {user?.linkedin && (
                <div className="flex items-center gap-2 text-gray-800">
                  <FiLink />
                  <span>LinkedIn:</span>
                  <span className="text-indigo-700 font-medium">
                    {user.linkedin}
                  </span>
                </div>
              )}
              {user?.portfolio && (
                <div className="flex items-center gap-2 text-gray-800">
                  <FiExternalLink />
                  <span>Portfolio:</span>
                  <span className="text-indigo-700 font-medium">
                    {user.portfolio}
                  </span>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="relative space-y-6">
            <Section
              title="Personal Details"
              subtitle="Tell employers who you are"
            >
              <Grid>
                <Input
                  label="First Name"
                  placeholder="Enter first name"
                  value={form.firstName}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      firstName: e.target.value,
                    })
                  }
                />
                <Input
                  label="Last Name"
                  placeholder="Enter last name"
                  value={form.lastName}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      lastName: e.target.value,
                    })
                  }
                />
                <Input
                  label="Phone"
                  placeholder="Enter phone"
                  value={form.phone}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      phone: e.target.value,
                    })
                  }
                />
                <Input
                  label="Email"
                  placeholder={user?.email || "Email"}
                  value={user?.email || ""}
                  onChange={() => {}}
                  disabled
                />
              </Grid>
            </Section>

            <Section
              title="Location"
              subtitle="Where you are based"
            >
              <Grid>
                <Input
                  label="Address"
                  placeholder="Street address"
                  value={form.address}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      address: e.target.value,
                    })
                  }
                />
                <Input
                  label="State"
                  placeholder="State"
                  value={form.state}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      state: e.target.value,
                    })
                  }
                />
                <Input
                  label="Country"
                  placeholder="Country"
                  value={form.country}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      country: e.target.value,
                    })
                  }
                />
                <Input
                  label="Zip Code"
                  placeholder="Zip code"
                  value={form.zipCode}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      zipCode: e.target.value,
                    })
                  }
                />
              </Grid>
            </Section>

            <Section
              title="Professional Info"
              subtitle="Role, experience, and salary"
            >
              <Grid>
                <Input
                  label="Current Role"
                  placeholder="e.g. Frontend Developer"
                  value={form.currentRole}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      currentRole: e.target.value,
                    })
                  }
                />
                <Input
                  label="Experience"
                  placeholder="e.g. 3 years"
                  value={form.experience}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      experience: e.target.value,
                    })
                  }
                />
                <Input
                  label="Expected Salary"
                  placeholder="e.g. 800000"
                  value={form.expectedSalary}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      expectedSalary: e.target.value,
                    })
                  }
                />
                <Input
                  label="Preferred Location"
                  placeholder="e.g. Remote, Pune"
                  value={form.preferredLocation}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      preferredLocation: e.target.value,
                    })
                  }
                />
              </Grid>

              <div className="mt-4">
                <TextArea
                  label="About"
                  placeholder="Short summary about you"
                  value={form.about}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      about: e.target.value,
                    })
                  }
                />
              </div>
            </Section>

            <Section
              title="Preferences"
              subtitle="Availability and work details"
            >
              <Grid>
                <Input
                  label="Notice Period"
                  placeholder="e.g. 15 days"
                  value={form.noticePeriod}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      noticePeriod: e.target.value,
                    })
                  }
                />
                <Input
                  label="Employment Type"
                  placeholder="e.g. Full-time"
                  value={form.employmentType}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      employmentType: e.target.value,
                    })
                  }
                />
                <Input
                  label="Availability"
                  placeholder="e.g. Immediate"
                  value={form.availability}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      availability: e.target.value,
                    })
                  }
                />
                <Select
                  label="Relocate"
                  value={form.relocate || ""}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      relocate: e.target.value,
                    })
                  }
                  options={[
                    { value: "", label: "Select" },
                    { value: "Yes", label: "Yes" },
                    { value: "No", label: "No" },
                  ]}
                />
                <Input
                  label="Preferred Shift"
                  placeholder="e.g. Day shift"
                  value={form.preferredShift}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      preferredShift: e.target.value,
                    })
                  }
                />
                <Input
                  label="Work Authorization"
                  placeholder="e.g. India"
                  value={form.workAuthorization}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      workAuthorization: e.target.value,
                    })
                  }
                />
              </Grid>
            </Section>

            <Section
              title="Links"
              subtitle="Showcase your profiles"
            >
              <Grid>
                <Input
                  label="LinkedIn"
                  placeholder="https://linkedin.com/in/..."
                  value={form.linkedin}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      linkedin: e.target.value,
                    })
                  }
                />
                <Input
                  label="Portfolio"
                  placeholder="https://your-portfolio.com"
                  value={form.portfolio}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      portfolio: e.target.value,
                    })
                  }
                />
              </Grid>
            </Section>

            <Section
              title="Skills"
              subtitle="Add your key skills"
            >
              <div className="flex gap-2 flex-wrap">
                {form.skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-xs flex items-center gap-1"
                  >
                    {skill}
                    <FiX
                      className="h-4 w-4 cursor-pointer"
                      onClick={() =>
                        handleRemoveSkill(skill)
                      }
                    />
                  </span>
                ))}
              </div>

              <div className="mt-3 flex flex-wrap gap-2">
                <input
                  value={skillInput}
                  onChange={(e) =>
                    setSkillInput(e.target.value)
                  }
                  placeholder="Add skill"
                  className="border px-3 py-2 rounded-lg text-sm text-gray-900 placeholder:text-gray-400"
                />
                <button
                  onClick={handleAddSkill}
                  className="btn-secondary"
                >
                  <FiPlus className="h-4 w-4" />
                </button>
              </div>
            </Section>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                className="btn-primary"
                onClick={handleSaveProfile}
                disabled={saving}
              >
                {saving ? "Saving..." : "Save Changes"}
              </button>
              <button
                className="btn-secondary"
                onClick={() => setEditMode(false)}
                disabled={saving}
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>

      {/* RESUME */}
      <div className="card flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700">
            <FiBriefcase className="h-5 w-5" />
          </div>
          <div>
            <p className="font-medium">Resume</p>
            <p className="text-sm text-gray-500">
              {user?.resume
                ? user.resume.split("/").pop()
                : "Not uploaded"}
            </p>
          </div>
        </div>

        <div className="flex flex-wrap gap-3">
          {resumeUrl && (
            <a
              href={resumeUrl}
              target="_blank"
              rel="noreferrer"
              className="btn-primary flex items-center gap-2"
            >
              <FiDownload className="h-4 w-4" />
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

/* ================= HELPERS ================= */

const Grid = ({ children }) => (
  <div className="grid md:grid-cols-2 gap-4">
    {children}
  </div>
);

const Section = ({ title, subtitle, children }) => (
  <div className="rounded-2xl border border-gray-100 bg-white/90 p-5 shadow-sm">
    <div className="mb-4">
      <p className="text-sm font-semibold text-gray-900">
        {title}
      </p>
      <p className="text-xs text-gray-500">{subtitle}</p>
    </div>
    {children}
  </div>
);

const Input = ({
  label,
  value,
  onChange,
  placeholder,
  disabled,
}) => (
  <div>
    <label className="text-sm text-gray-700">
      {label}
    </label>
    <input
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      disabled={disabled}
      className="w-full border border-gray-200 bg-white px-3 py-2 rounded-lg text-sm text-gray-900 placeholder:text-gray-400 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-100 disabled:bg-gray-50"
    />
  </div>
);

const TextArea = ({
  label,
  value,
  onChange,
  placeholder,
}) => (
  <div>
    <label className="text-sm text-gray-700">
      {label}
    </label>
    <textarea
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      rows={4}
      className="w-full border border-gray-200 bg-white px-3 py-2 rounded-lg text-sm text-gray-900 placeholder:text-gray-400 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-100"
    />
  </div>
);

const Select = ({ label, value, onChange, options }) => (
  <div>
    <label className="text-sm text-gray-700">
      {label}
    </label>
    <select
      value={value}
      onChange={onChange}
      className="w-full border border-gray-200 bg-white px-3 py-2 rounded-lg text-sm text-gray-900 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-100"
    >
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  </div>
);

export default Profile;
