import { useState } from "react";
import {
  CheckCircleIcon,
  NoSymbolIcon,
  PencilSquareIcon,
} from "@heroicons/react/24/outline";
import { useGetEmployerByIdQuery, useGetEmployerDashboardQuery, useUpdateEmployerMutation, useUpdateEmployerStatusMutation } from "../../services/endpoints/employerApi";
import { useParams } from "react-router-dom";
import { formatDate } from "../../utils/formateDate";
import { toast } from "react-toastify";

const EmployerDetails = () => {
  const [editModal, setEditModal] = useState(false);
const [formData, setFormData] = useState({});


  const id = useParams()?.id;
  const {data: employerData, isLoading, isError} = useGetEmployerDashboardQuery();
  const { data , loading , error } = useGetEmployerByIdQuery(id);
   const [employerStatus, { isLoading: statusLoading, error: statusError }] = useUpdateEmployerStatusMutation();
  const [updateEmployer] = useUpdateEmployerMutation();

  const handleChange = (e) => {
  setFormData({ ...formData, [e.target.name]: e.target.value });
};
 
const handleSave = async () => {
  try {
    await updateEmployer({ id, data: formData }).unwrap();
    toast.success("Employer updated successfully");
    setEditModal(false);
  } catch (err) {
    toast.error("Failed to update employer");
    console.error(err);
  }
};

  const handleApprove = async () => {
    try {
      await employerStatus({ id, data: { status: "ACTIVE" } }).unwrap();
      toast.success("Employer approved successfully");
    } catch (error) {
      toast.error("Failed to approve employer");
      console.log("Error approving employer:", error);

    }
  }

  const handleBlocked = async () => {
    try {
      await employerStatus({ id, data: { status: "BLOCKED" } }).unwrap();
      toast.success("Employer blocked successfully");
    } catch (error) {
      toast.error("Failed to block employer");
      console.log("Error blocking employer:", error);

    }
  }
 
  const statusColor = {
    ACTIVE: "bg-green-100 text-green-700",
    PENDING: "bg-yellow-100 text-yellow-700",
    BLOCKED: "bg-red-100 text-red-700",
  };
  if (isLoading || loading) return <div>Loading...</div>;
  if (isError) return <div>Error loading employer data.</div>;
  return (
    <div className="space-y-6">
      <button className="text-sm text-gray-800  border rounded-md p-2 hover:shadow-md transition flex items-center gap-1 duration-300 hover:scale-105 hover:text-white hover:bg-[#313C1D] cursor-pointer" onClick={() => window.history.back()}>
        &larr; Back to Employers
      </button>  
      <div className="bg-white rounded-xl shadow-sm p-6 flex justify-between items-center">
        <div className="flex items-center gap-4">
          <img
   
            src={data?.avatar || "https://i.pravatar.cc/150?img=12"}
            alt="avatar"
            className="w-16 h-16 rounded-lg object-cover"
          />
          <div>
            <h2 className="text-xl font-semibold">{data?.companyName}</h2>
            <span
              className={`inline-block mt-1 px-3 py-1 text-xs rounded-full font-medium ${
                statusColor[data?.status]
              }`}
            >
              {data?.status}
            </span>
          </div>
        </div>

        {/* ACTIONS */}
        <div className="flex gap-3">
          {data?.status === "ACTIVE" ? (
  <button onClick={handleBlocked} className="btn-danger cursor-pointer transition-all duration-300 hover:scale-105">
    Block
  </button>
) : (
  <button onClick={handleApprove} className="btn-secondary cursor-pointer transition-all duration-300 hover:scale-105">
    Activate
  </button>
)}


          <button onClick={()=>{
            setFormData(data),
            setEditModal(true)}}  className=" flex items-center gap-1 px-4 py-2 text-sm bg-gray-800 text-white rounded-lg cursor-pointer hover:scale-105 transition-all duration-300">
            <PencilSquareIcon className="w-4 h-4" />
            Edit
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <StatCard label="Total Jobs" value={employerData?.stats?.totalJobs} />
        <StatCard label="Active Jobs" value={employerData?.stats?.activeJobs} />
        <StatCard
          label="Applications Received"
          value={employerData?.stats?.totalApplications}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="font-semibold mb-4">Company Information</h3>

          <Detail label="Industry" value={data?.industry} />
          <Detail label="Company Size" value={data?.companySize} />
          <Detail label="Website" value={data?.website} />
          <Detail label="Joined Date" value={formatDate(data?.createdAt)} />

          <p className="text-sm text-gray-600 mt-4">{data?.description}</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="font-semibold mb-4">Employer Contact</h3>

          <Detail label="Name" value={data?.contactName} />
          <Detail label="Role" value={data?.contactRole?.toUpperCase()} />
          <Detail label="Email" value={data?.contactEmail} />
          <Detail label="Phone" value={data?.contactPhone} />
        </div>
      </div>
      {editModal && (
  <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 ">
    <div onClick={(e) => e.stopPropagation()} className="bg-white w-full max-w-2xl rounded-xl shadow-lg p-6 space-y-5">

      <h2 className="text-xl font-semibold">Edit Employer Profile</h2>

      {/* COMPANY INFO */}
      <div>
        <h3 className="font-medium mb-2">Company Information</h3>

        <input
          name="companyName"
          value={formData.companyName || ""}
          onChange={handleChange}
          placeholder="Company Name"
          className="input w-full mb-2"
        />

        <input
          name="industry"
          value={formData.industry || ""}
          onChange={handleChange}
          placeholder="Industry"
          className="input w-full mb-2"
        />

        <input
          name="companySize"
          value={formData.companySize || ""}
          onChange={handleChange}
          placeholder="Company Size"
          className="input w-full mb-2"
        />

        <input
          name="website"
          value={formData.website || ""}
          onChange={handleChange}
          placeholder="Website"
          className="input w-full"
        />
      </div>

      {/* CONTACT INFO */}
      <div>
        <h3 className="font-medium mb-2">Employer Contact</h3>

        <input
          name="contactName"
          value={formData.contactName || ""}
          onChange={handleChange}
          placeholder="Contact Name"
          className="input w-full mb-2"
        />

        <input
          name="contactRole"
          value={formData.contactRole || ""}
          onChange={handleChange}
          placeholder="Role"
          className="input w-full mb-2"
        />

        <input
          name="contactEmail"
          value={formData.contactEmail || ""}
          onChange={handleChange}
          placeholder="Email"
          className="input w-full mb-2"
        />

        <input
          name="contactPhone"
          value={formData.contactPhone || ""}
          onChange={handleChange}
          placeholder="Phone"
          className="input w-full"
        />
      </div>

      {/* ACTIONS */}
      <div className="flex justify-end gap-3 pt-4">
        <button
          onClick={() => setEditModal(false)}
          className="px-4 py-2 border rounded-lg cursor-pointer transition-all duration-300 hover:scale-105"
        >
          Cancel
        </button>

        <button
          onClick={handleSave}
          className="px-4 py-2 bg-green-600 text-white rounded-lg transition-all duration-300 hover:scale-105 cursor-pointer"
        >
          Save Changes
        </button>
      </div>
    </div>
  </div>
)}

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
