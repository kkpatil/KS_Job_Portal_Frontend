import {
  PencilSquareIcon,
  DocumentArrowDownIcon,
  ArrowDownRightIcon,
  ArrowLeftIcon,
} from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";

const Profile = () => {
  return (
    <div className="space-y-6 py-2 md:px-0">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
        <div>
          <h1 className="text-2xl font-bold ">My Profile</h1>
          <p className="text-gray-500 mb-2">
            View and manage your profile information
          </p>
        </div>
        <div className="flex flex-col md:flex-row w-full md:w-auto gap-2 md:gap-5 ">

        <Link to={-1} className="btn-primary flex items-center gap-2 text-white ">
          <ArrowLeftIcon className="w-4 h-4 "/> Back
        </Link>
        <button className="btn-secondary flex items-center gap-1">
          <PencilSquareIcon className="w-4 h-4" />
          Edit Profile
        </button>
        </div>
      </div>

      <div className="card flex flex-col md:flex-row gap-6">
        {/* Avatar */}
        <div className="flex-shrink-0">
          <div className="w-24 h-24 rounded-full bg-indigo-100 flex items-center justify-center text-3xl font-bold text-indigo-600">
            AV
          </div>
        </div>

        {/* Info */}
        <div className="space-y-2">
          <h2 className="text-xl font-semibold">
            Amit Verma
          </h2>
          <p className="text-gray-600">
            Frontend Developer
          </p>
          <p className="text-sm text-gray-500">
            amit@gmail.com • +91 98765 43210
          </p>
          <p className="text-sm text-gray-500">
            Bangalore, India
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* LEFT */}
        <div className="card space-y-4">
          <ProfileItem label="Experience" value="3 Years" />
          <ProfileItem label="Current Role" value="Frontend Developer" />
          <ProfileItem label="Expected Salary" value="₹8 – ₹12 LPA" />
          <ProfileItem label="Preferred Location" value="Remote / Bangalore" />
        </div>

        {/* RIGHT */}
        <div className="card">
          <h3 className="font-semibold mb-3">Skills</h3>
          <div className="flex flex-wrap gap-2">
            {[
              "React",
              "JavaScript",
              "HTML",
              "CSS",
              "Tailwind",
            ].map((skill, index) => (
              <span
                key={index}
                className="px-3 py-1 rounded-full text-xs bg-indigo-100 text-indigo-700"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="card">
        <h3 className="font-semibold mb-2">About Me</h3>
        <p className="text-sm text-gray-600">
          I am a passionate frontend developer with experience
          building responsive web applications using React and
          modern UI frameworks. I enjoy learning new technologies
          and working on challenging projects.
        </p>
      </div>

      <div className="card flex justify-between items-center">
        <div>
          <p className="font-medium">Resume</p>
          <p className="text-sm text-gray-500">
            amit-verma-resume.pdf
          </p>
        </div>

        <button className="btn-primary flex items-center gap-1">
          <DocumentArrowDownIcon className="w-4 h-4" />
          Download
        </button>
      </div>
    </div>
  );
};


const ProfileItem = ({ label, value }) => (
  <div className="flex justify-between text-sm">
    <span className="text-gray-500">{label}</span>
    <span className="font-medium">{value}</span>
  </div>
);

export default Profile;
