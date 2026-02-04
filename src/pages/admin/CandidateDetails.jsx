import { Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import {
  useDeleteCandidateMutation,
  useGetCandidateByIdQuery,
} from "../../services/endpoints/adminApi";

const CandidateDetails = () => {
  const { id } = useParams();
  const { data, isLoading, isError } = useGetCandidateByIdQuery(id);
  const [deleteCandidate, { isLoading: deleting }] =
    useDeleteCandidateMutation();

  const user = data?.data;
  const name =
    user?.firstName || user?.lastName
      ? `${user?.firstName || ""} ${user?.lastName || ""}`.trim()
      : user?.name || "Candidate";

  const handleDelete = async () => {
    try {
      await deleteCandidate(id).unwrap();
      toast.success("Candidate deleted");
    } catch (err) {
      toast.error(err?.data?.message || "Failed to delete candidate");
    }
  };

  if (isLoading) return <div className="card">Loading...</div>;
  if (isError || !user)
    return (
      <div className="card">
        <p className="text-gray-500">Candidate not found</p>
        <Link to="/admin/candidates" className="text-indigo-600 underline">
          Back
        </Link>
      </div>
    );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">{name}</h1>
          <p className="text-sm text-gray-500">{user.email}</p>
        </div>
        <div className="flex gap-3">
          <Link to="/admin/candidates" className="btn-secondary">
            Back
          </Link>
          <button
            onClick={handleDelete}
            disabled={deleting}
            className="btn-danger"
          >
            Delete
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="card space-y-3">
          <Detail label="First Name" value={user.firstName || "—"} />
          <Detail label="Last Name" value={user.lastName || "—"} />
          <Detail label="Phone" value={user.phone || "—"} />
          <Detail label="Current Role" value={user.currentRole || "—"} />
          <Detail label="Experience" value={user.experience || "—"} />
          <Detail label="Preferred Location" value={user.preferredLocation || "—"} />
          <Detail label="Expected Salary" value={user.expectedSalary || "—"} />
          <Detail label="Status" value={user.status || "ACTIVE"} />
        </div>

        <div className="card space-y-3">
          <Detail label="Country" value={user.country || "—"} />
          <Detail label="State" value={user.state || "—"} />
          <Detail label="Zip Code" value={user.zipCode || "—"} />
          <Detail label="Address" value={user.address || "—"} />
          <Detail label="Notice Period" value={user.noticePeriod || "—"} />
          <Detail label="Employment Type" value={user.employmentType || "—"} />
          <Detail label="Availability" value={user.availability || "—"} />
          <Detail label="Work Authorization" value={user.workAuthorization || "—"} />
        </div>
      </div>

      <div className="card">
        <h3 className="font-semibold mb-2">Skills</h3>
        <div className="flex flex-wrap gap-2">
          {user.skills?.length ? (
            user.skills.map((skill) => (
              <span
                key={skill}
                className="px-3 py-1 rounded-full text-xs bg-indigo-100 text-indigo-700"
              >
                {skill}
              </span>
            ))
          ) : (
            <span className="text-sm text-gray-500">No skills</span>
          )}
        </div>
      </div>

      {user.about && (
        <div className="card">
          <h3 className="font-semibold mb-2">About</h3>
          <p className="text-sm text-gray-600">{user.about}</p>
        </div>
      )}
    </div>
  );
};

const Detail = ({ label, value }) => (
  <div className="flex justify-between text-sm">
    <span className="text-gray-500">{label}</span>
    <span className="font-medium">{value}</span>
  </div>
);

export default CandidateDetails;
