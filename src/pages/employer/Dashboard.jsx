import {
  BriefcaseIcon,
  UsersIcon,
  DocumentTextIcon,
  EyeIcon,
  PlusIcon,
} from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import PostJobModal from "../../components/employer/PostJobModal";
import { useState } from "react";
import {  useGetEmployerDashboardQuery, useGetRecentApplicationsQuery, useGetRecentEmployersJobsQuery } from "../../services/endpoints/employerDashboardApi";

const Dashboard = () => {

  const { data: employerDashboard ,
          loading: employerDashboardLoading, 
          error: employerDashboardError} = useGetEmployerDashboardQuery();

  const {data:employerRecentJobs} = useGetRecentEmployersJobsQuery(); 
  
  const {data:recentApplications} = useGetRecentApplicationsQuery();
  console.log("employerRecentJobs",employerRecentJobs);


  const [showCreateJobModal,setShowCreateJobModal] = useState(false);
  return (
    <div className="space-y-6 py-2 md:px-0">
      <div>
        <h1 className="text-2xl font-bold">Employer Dashboard</h1>
        <p className="text-gray-500">
          Manage your jobs, applications, and hiring progress
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Jobs"
          value={employerDashboard?.data?.totalJobs}
          icon={<BriefcaseIcon className="w-6 h-6" />}
        />
        <StatCard
          title="Active Jobs"
          value={employerDashboard?.data?.activeJobs}
          icon={<DocumentTextIcon className="w-6 h-6" />}
        />
        <StatCard
          title="Applications"
          value={employerDashboard?.data?.totalApplications}
          icon={<UsersIcon className="w-6 h-6" />}
        />
        <StatCard
          title="Profile Views"
          value={employerDashboard?.data?.profileViews}
          icon={<EyeIcon className="w-6 h-6" />}
        />
      </div>

      <div className="card flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="text-lg font-semibold">Quick Actions</h2>
          <p className="text-sm text-gray-500">
            Post new jobs and manage your listings
          </p>
        </div>

        <button
          onClick={()=>setShowCreateJobModal(true)}
          className="btn-primary flex items-center gap-1"
        >
          <PlusIcon className="w-4 h-4" />
          Post New Job
        </button>
      </div>

      <div className="card">
        <h2 className="text-lg font-semibold mb-4">Recent Jobs</h2>

        <div className="hidden md:block overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 border-b text-left">
                <th className="px-4 py-3">Job Title</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3 text-center">Applications</th>
                <th className="px-4 py-3">Posted On</th>
                <th className="px-4 py-3 text-center">Action</th>
              </tr>
            </thead>

            <tbody>
              {employerRecentJobs?.map((job) => (
                <tr
                  key={job.id}
                  className="border-b hover:bg-gray-50"
                >
                  <td className="px-4 py-3 font-medium">
                    {job.title}
                  </td>

                  <td className="px-4 py-3">
                    <span
                      className={`px-3 py-1 rounded-full text-xs ${
                        job.status === "Active"
                          ? "bg-green-100 text-green-700"
                          : job.status === "Closed"
                            ? "bg-red-100 text-red-700"
                            : job.status === "Pending"
                              ? "bg-yellow-100 text-yellow-700"
                              : "bg-red-100 text-red-700"

                      }`}
                    >
                      {job.status}
                    </span>
                  </td>

                  <td className="px-4 py-3 text-center">
                    {job.applications}
                  </td>

                  <td className="px-4 py-3">{job.postedOn}</td>

                  <td className="px-4 py-3 text-center">
                    <Link
                      to={`/employer/jobs/${job.id}`}
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
        <div className="space-y-4 block md:hidden">
  {employerRecentJobs?.map((job) => (
    <div
      key={job._id}
      className=" rounded-lg p-4 tabl shadow  space-y-2"
    >
      {/* Job Title */}
      <div className="font-semibold text-base">
        {job.title}
      </div>

      {/* Status */}
      <div>
        <span
          className={`px-3 py-1 rounded-full text-xs ${
            job.status === "Active"
              ? "bg-green-100 text-green-700"
              : "bg-yellow-100 text-yellow-700"
          }`}
        >
          {job.status}
        </span>
      </div>

      {/* Meta Info */}
      <div className="text-sm text-gray-500 flex justify-between">
        <span>Applications: {job.applications}</span>
        <span>{job.postedOn}</span>
      </div>

      {/* Action */}
      <div className="pt-2 text-right">
        <Link
          to={`/employer/jobs/${job.id}`}
          className="text-indigo-600 text-sm font-medium scale-100 hover:scale-105 transition-all hover:text-indigo-500 duration-300"
        >
          View Job →
        </Link>
      </div>
    </div>
  ))}

  {/* Empty State */}
  {employerRecentJobs?.length === 0 && (
    <p className="text-center text-gray-500 py-6">
      No jobs posted yet
    </p>
  )}
</div>

      </div>

      <div className="card">
        <h2 className="text-lg font-semibold mb-4">
          Recent Applications
        </h2>

        <div className="space-y-3">
          {recentApplications?.length === 0 && (
            <p className="text-center text-gray-500">
              No recent applications
            </p>
          )}
          {recentApplications?.map((app) => (
            <div
              key={app._id}
              className="flex justify-between items-center border rounded-lg p-4"
            >
              <div>
                <p className="font-medium">{app.candidate}</p>
                <p className="text-sm text-gray-500">
                  {app.job}
                </p>
              </div>

              <span
                className={`px-3 py-1 rounded-full text-xs ${
                  app.status === "Shortlisted"
                    ? "bg-green-100 text-green-700"
                    : "bg-blue-100 text-blue-700"
                }`}
              >
                {app.status}
              </span>
            </div>
          ))}
        </div>
      </div>
      {
        showCreateJobModal && (
        <PostJobModal
          
          onClose={() => setShowCreateJobModal(false)}
          
          
        />
      ) 
      }
    </div>
  );
};


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
