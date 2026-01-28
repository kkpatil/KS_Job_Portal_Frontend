import {
  BriefcaseIcon,
  BookmarkIcon,
  PaperAirplaneIcon,
  EyeIcon,
} from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import {
  useGetCandidateDashboardQuery,
  useGetRecentApplicationsQuery,
  useGetRecommendedJobsQuery,
} from "../../services/endpoints/candidate/dashbaordApi";

const Dashboard = () => {
  const {
    data: candidateDashboardStats,
    isLoading: candidateDashboardStatsLoading,
    error: candidateDashboardStatsError,
  } = useGetCandidateDashboardQuery();

  const {
    data: recentApplications,
    isLoading: recentApplicationsLoading,
    error: recentApplicationsError,
  } = useGetRecentApplicationsQuery();
  const {
    data: recommendedJobs,
    isLoading: recentJobsLoading,
    error: recentJobsError,
  } = useGetRecommendedJobsQuery();
  return (
    <div className="space-y-6 py-0 sm:px-0">
      <div>
        <h1 className="text-2xl font-bold">Candidate Dashboard</h1>
        <p className="text-gray-500">
          Track your job applications and discover new opportunities
        </p>
      </div>

      {candidateDashboardStatsLoading && <p>Loading...</p>}
      {candidateDashboardStatsError && (
        <p>Error: {candidateDashboardStatsError.error}</p>
      )}
      {candidateDashboardStats && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            title="Applied Jobs"
            value={candidateDashboardStats?.data?.appliedJobs}
            icon={<PaperAirplaneIcon className="w-6 h-6" />}
          />
          <StatCard
            title="Saved Jobs"
            value={candidateDashboardStats?.data?.savedJobs}
            icon={<BookmarkIcon className="w-6 h-6" />}
          />
          <StatCard
            title="Profile Views"
            value={candidateDashboardStats?.data?.profileViews}
            icon={<EyeIcon className="w-6 h-6" />}
          />
          <StatCard
            title="Recommended Jobs"
            value={candidateDashboardStats?.data?.recommendedJobs}
            icon={<BriefcaseIcon className="w-6 h-6" />}
          />
        </div>
      )}

      <div className="card flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="text-lg font-semibold">Quick Actions</h2>
          <p className="text-sm text-gray-500">
            Explore jobs and manage your applications
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <Link to="/jobs" className="btn-primary text-center">
            Browse Jobs
          </Link>
          <Link to="/candidate/profile" className="btn-secondary text-center">
            Update Profile
          </Link>
        </div>
      </div>

      <div className="card">
        <h2 className="text-lg font-semibold mb-4">Recent Applications</h2>

        <div className="hidden md:block overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 border-b text-left">
                <th className="px-4 py-3">Job</th>
                <th className="px-4 py-3">Company</th>
                <th className="px-4 py-3">Applied On</th>
                <th className="px-4 py-3 text-center">Status</th>
                <th className="px-4 py-3 text-center">Action</th>
              </tr>
            </thead>

            <tbody>
              {recentApplicationsLoading && <p>Loading...</p>}
              {recentApplications?.length === 0 && (
                <div className="flex items-center justify-center h-20 ">
                  <p className="text-center text-gray-500">
                    No applications found
                  </p>
                </div>
              )}

              {recentApplications?.map((app) => (
                <tr key={app.id} className="border-b hover:bg-gray-50">
                  <td className="px-4 py-3 font-medium">{app?.job}</td>
                  <td className="px-4 py-3">{app?.company}</td>
                  <td className="px-4 py-3">{app?.appliedOn}</td>

                  <td className="px-4 py-3 text-center">
                    <span
                      className={`px-3 py-1 rounded-full text-xs ${
                        app?.status === "Shortlisted"
                          ? "bg-green-100 text-green-700"
                          : app?.status === "Rejected"
                            ? "bg-red-100 text-red-700"
                            : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {app?.status}
                    </span>
                  </td>

                  <td className="px-4 py-3 text-center">
                    <Link
                      to={`/candidate/jobs/${app?.id}`}
                      className="text-indigo-600 hover:underline text-sm"
                    >
                      View
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="md:hidden space-y-4">
          {recentApplications?.map((app) => (
            <div key={app._id} className="border rounded-lg p-4 space-y-2">
              <div className="font-semibold">{app?.job}</div>
              <div className="text-sm text-gray-500">{app?.company}</div>
              <div className="text-xs text-gray-400">
                Applied on {app?.appliedOn}
              </div>

              <div className="flex items-center justify-between">
                <StatusBadge status={app?.status} />
                <Link
                  to={`/jobs/${app?._id}`}
                  className="text-indigo-600 text-sm"
                >
                  View
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="card">
        <h2 className="text-lg font-semibold mb-4">Recommended Jobs</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {recommendedJobs?.map((job) => (
            <div
              key={job.id}
              className="border rounded-lg p-4 flex justify-between items-center"
            >
              <div>
                <p className="font-medium">{job.title}</p>
                <p className="text-sm text-gray-500">
                  {job.company} • {job.location}
                </p>
              </div>

              <Link
                to={`/candidate/jobs/${job.id}`}
                className="btn-primary text-sm"
              >
                Apply
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const StatusBadge = ({ status }) => (
  <span
    className={`px-3 py-1 rounded-full text-xs ${
      status === "Shortlisted"
        ? "bg-green-100 text-green-700"
        : status === "Rejected"
          ? "bg-red-100 text-red-700"
          : "bg-yellow-100 text-yellow-700"
    }`}
  >
    {status}
  </span>
);

const StatCard = ({ title, value, icon }) => (
  <div className="card flex items-center gap-4">
    <div className="w-12 h-12 flex items-center justify-center rounded-lg bg-indigo-100 text-indigo-600">
      {icon}
    </div>
    <div>
      <div className="text-sm text-gray-500">{title}</div>
      <div className="text-2xl font-bold">{value}</div>
    </div>
  </div>
);

export default Dashboard;
