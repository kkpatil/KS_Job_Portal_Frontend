import {
  DocumentChartBarIcon,
  UsersIcon,
  BriefcaseIcon,
  ArrowDownTrayIcon,
} from "@heroicons/react/24/outline";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";

import {
  useGetSummaryQuery,
  useGetApplicationTrendQuery,
  useGetJobsBySkillQuery,
  useGetJobsReportQuery,
  useGetApplicationsReportQuery,
  useGetReportsListQuery,
} from "../../services/endpoints/reportsApi";
import { toast } from "react-toastify";

const statusColor = {
  ACTIVE: "bg-green-100 text-green-700",
  PENDING: "bg-yellow-100 text-yellow-700",
  BLOCKED: "bg-red-100 text-red-700",
  REJECTED: "bg-gray-200 text-gray-600",
  NEW: "bg-blue-100 text-blue-700",
  APPLIED: "bg-yellow-100 text-yellow-700",
  SHORTLISTED: "bg-green-100 text-green-700",
  HIRED: "bg-emerald-100 text-emerald-700",
};

const Reports = () => {
  const { data: summary } = useGetSummaryQuery();
  const { data: applicationData = [] } = useGetApplicationTrendQuery();
  // console.log(applicationData);
  const { data: jobCategoryData = [] } = useGetJobsBySkillQuery();
  console.log(jobCategoryData);
  const { data: jobsReport = [] } = useGetJobsReportQuery();
  const { data: applicationsReport = [] } = useGetApplicationsReportQuery();
  const { data: reportsList = [] } = useGetReportsListQuery();

 const downloadReport = async (key) => {
  try {
    const token = localStorage.getItem("token");

    const response = await fetch(
      `${import.meta.env.VITE_API_BASE_URL}/reports/download/${key}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to download report");
    }

    const blob = await response.blob();

    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${key}-report.pdf`;
    document.body.appendChild(a);
    a.click();
    a.remove();

    window.URL.revokeObjectURL(url);
    toast.success("Report downloaded successfully");
  } catch (error) {
    console.error("Download error:", error);
    toast.error("Failed to download report");
  }
};



  return (
    <div className="space-y-6">

      {/* ================= SUMMARY CARDS ================= */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <ReportCard title="Total Candidates" value={summary?.candidates} icon={<UsersIcon className="w-6 h-6" />} />
        <ReportCard title="Total Jobs" value={summary?.jobs} icon={<BriefcaseIcon className="w-6 h-6" />} />
        <ReportCard title="Applications" value={summary?.applications} icon={<DocumentChartBarIcon className="w-6 h-6" />} />
        <ReportCard title="Employers" value={summary?.employers} icon={<UsersIcon className="w-6 h-6" />} />
      </div>

      {/* ================= CHARTS ================= */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartCard title="Applications Trend">
          <LineChart data={applicationData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Line dataKey="applications" stroke="#4f46e5" />
          </LineChart>
        </ChartCard>

        <ChartCard title="Jobs by Skill">
          <BarChart data={jobCategoryData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="category" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="jobs" fill="#4f46e5" />
          </BarChart>
        </ChartCard>
      </div>

      {/* ================= JOBS REPORT ================= */}
      <ReportTable
        title="Jobs Report"
        headers={["Title", "Employer", "Status", "Posted On"]}
        rows={jobsReport.map(j => [
          j.title,
          j.employer?.name || "—",
          j.status,
          new Date(j.createdAt).toLocaleDateString(),
        ])}
        statusIndex={2}
      />

      {/* ================= APPLICATIONS REPORT ================= */}
      <ReportTable
        title="Applications Report"
        headers={["Candidate", "Job", "Status", "Applied On"]}
        rows={applicationsReport.map(a => [
          a.candidate?.name,
          a.job?.title,
          a.status,
          new Date(a.createdAt).toLocaleDateString(),
        ])}
        statusIndex={2}
      />

      {/* ================= REPORTS LIST ================= */}
    <div className="card">
      <h3 className="text-lg font-semibold mb-4">Available Reports</h3>

      <div className="hidden md:block overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-[#ebf5c6]">
            <tr>
              <th className="px-4 py-2 text-left">Report</th>
              <th className="px-4 py-2 text-center">Action</th>
            </tr>
          </thead>

          <tbody>
            {reportsList.map((report) => (
              <tr key={report.key} className="border-b">
                <td className="px-4 py-2 font-medium">{report.title}</td>

                <td className="px-4 py-2 text-center">
                  <button
                    onClick={() => downloadReport(report.key)}
                    className="text-indigo-600 flex items-center gap-1 justify-center"
                  >
                    <ArrowDownTrayIcon className="w-4 h-4" />
                    Download
                  </button>
                </td>
              </tr>
            ))}

            {reportsList.length === 0 && (
              <tr>
                <td colSpan="2" className="text-center py-6 text-gray-500">
                  No reports available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="md:hidden space-y-3">
        {reportsList.map((report) => (
          <div
            key={report.key}
            className="border rounded-lg p-4 shadow-sm bg-white flex items-center justify-between gap-3"
          >
            <div className="font-medium text-sm">{report.title}</div>
            <button
              onClick={() => downloadReport(report.key)}
              className="text-indigo-600 flex items-center gap-1"
            >
              <ArrowDownTrayIcon className="w-4 h-4" />
              Download
            </button>
          </div>
        ))}

        {reportsList.length === 0 && (
          <div className="text-center py-6 text-gray-500">
            No reports available
          </div>
        )}
      </div>
    </div>


    </div>
  );
};

/* ================= SMALL COMPONENTS ================= */

const ReportCard = ({ title, value, icon }) => (
  <div className="card flex items-center gap-6">
    <div className="w-12 h-12 flex items-center justify-center rounded-lg bg-indigo-100 text-indigo-600">
      {icon}
    </div>
    <div>
      <div className="text-sm text-gray-500">{title}</div>
      <div className="text-2xl font-bold">{value ?? 0}</div>
    </div>
  </div>
);

const ChartCard = ({ title, children }) => (
  <div className="card">
    <h3 className="text-lg font-semibold mb-4">{title}</h3>
    <ResponsiveContainer width="100%" height={300}>
      {children}
    </ResponsiveContainer>
  </div>
);

const ReportTable = ({ title, headers, rows, statusIndex }) => {
  const renderCell = (cell, isStatus) =>
    isStatus ? (
      <span
        className={`px-2 py-1 rounded-full text-xs ${
          statusColor[cell] || "bg-gray-100 text-gray-700"
        }`}
      >
        {cell}
      </span>
    ) : (
      cell
    );

  return (
    <div className="card">
      <h3 className="text-lg font-semibold mb-4">{title}</h3>

      <div className="hidden md:block overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-[#ebf5c6]">
            <tr>
              {headers.map((h, i) => (
                <th key={i} className="px-4 py-2 text-left">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => (
              <tr key={i} className="border-b">
                {row.map((cell, j) => (
                  <td key={j} className="px-4 py-2">
                    {renderCell(cell, statusIndex === j)}
                  </td>
                ))}
              </tr>
            ))}

            {rows.length === 0 && (
              <tr>
                <td colSpan={headers.length} className="text-center py-6 text-gray-500">
                  No data available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="md:hidden space-y-4">
        {rows.map((row, i) => (
          <div
            key={i}
            className="border rounded-lg p-4 shadow-sm bg-white space-y-2"
          >
            {row.map((cell, j) => (
              <div key={j} className="flex items-start justify-between gap-3 text-sm">
                <span className="text-gray-500">{headers[j]}</span>
                <span className="text-right">{renderCell(cell, statusIndex === j)}</span>
              </div>
            ))}
          </div>
        ))}

        {rows.length === 0 && (
          <div className="text-center py-6 text-gray-500">No data available</div>
        )}
      </div>
    </div>
  );
};

export default Reports;
