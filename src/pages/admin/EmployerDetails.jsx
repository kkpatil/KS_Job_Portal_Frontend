import {
  CheckCircleIcon,
  NoSymbolIcon,
  PencilSquareIcon,
} from "@heroicons/react/24/outline";

const EmployerDetails = () => {

  const employer = {
    id: 1,
    companyName: "TechNova Pvt Ltd",
    logo: "https://i.pravatar.cc/150?img=12",
    status: "Pending",
    industry: "IT Services",
    companySize: "50–100 Employees",
    website: "https://technova.com",
    joined: "12 Jan 2025",
    description:
      "TechNova is a leading IT services company specializing in enterprise software and cloud solutions.",

    contact: {
      name: "Rahul Sharma",
      email: "hr@technova.com",
      phone: "+91 98765 43210",
      role: "HR Manager",
    },

    stats: {
      totalJobs: 12,
      activeJobs: 8,
      applications: 236,
    },
  };

  const statusColor = {
    Active: "bg-green-100 text-green-700",
    Pending: "bg-yellow-100 text-yellow-700",
    Blocked: "bg-red-100 text-red-700",
  };

  return (
    <div className="space-y-6">
      <button className="text-sm text-gray-800  border rounded-md p-2 hover:shadow-md transition flex items-center gap-1 duration-300 hover:scale-105 hover:text-white hover:bg-[#313C1D] cursor-pointer" onClick={() => window.history.back()}>
        &larr; Back to Employers
      </button>  
      <div className="bg-white rounded-xl shadow-sm p-6 flex justify-between items-center">
        <div className="flex items-center gap-4">
          <img
            src={employer.logo}
            alt="logo"
            className="w-16 h-16 rounded-lg object-cover"
          />
          <div>
            <h2 className="text-xl font-semibold">{employer.companyName}</h2>
            <span
              className={`inline-block mt-1 px-3 py-1 text-xs rounded-full font-medium ${
                statusColor[employer.status]
              }`}
            >
              {employer.status}
            </span>
          </div>
        </div>

        {/* ACTIONS */}
        <div className="flex gap-3">
          <button className="flex items-center gap-1 px-4 py-2 text-sm  btn-secondary text-white rounded-lg">
            <CheckCircleIcon className="w-4 h-4" />
            Approve
          </button>

          <button className="flex items-center gap-1 px-4 py-2 text-sm btn-danger text-white rounded-lg">
            <NoSymbolIcon className="w-4 h-4" />
            Block
          </button>

          <button className="flex items-center gap-1 px-4 py-2 text-sm bg-gray-800 text-white rounded-lg">
            <PencilSquareIcon className="w-4 h-4" />
            Edit
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <StatCard label="Total Jobs" value={employer.stats.totalJobs} />
        <StatCard label="Active Jobs" value={employer.stats.activeJobs} />
        <StatCard
          label="Applications Received"
          value={employer.stats.applications}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="font-semibold mb-4">Company Information</h3>

          <Detail label="Industry" value={employer.industry} />
          <Detail label="Company Size" value={employer.companySize} />
          <Detail label="Website" value={employer.website} />
          <Detail label="Joined Date" value={employer.joined} />

          <p className="text-sm text-gray-600 mt-4">{employer.description}</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="font-semibold mb-4">Employer Contact</h3>

          <Detail label="Name" value={employer.contact.name} />
          <Detail label="Role" value={employer.contact.role} />
          <Detail label="Email" value={employer.contact.email} />
          <Detail label="Phone" value={employer.contact.phone} />
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ label, value }) => (
  <div className="bg-white rounded-xl shadow-sm p-6 text-center">
    <div className="text-2xl font-bold">{value}</div>
    <div className="text-sm text-gray-500 mt-1">{label}</div>
  </div>
);

const Detail = ({ label, value }) => (
  <div className="flex justify-between text-sm mb-2">
    <span className="text-gray-500">{label}</span>
    <span className="font-medium">{value}</span>
  </div>
);

export default EmployerDetails;
