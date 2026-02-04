import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useState } from "react";

import {
  useGetAdminDashboardQuery,
  useGetCandidatesQuery,
  useGetRecentActivitiesQuery,
  useGetSystemAlertsQuery,
} from "../../services/endpoints/adminApi";



// const chartData = [
//   { name: "Week 1", users: 400, jobs: 240 },
//   { name: "Week 2", users: 700, jobs: 390 },
//   { name: "Week 3", users: 1100, jobs: 680 },
//   { name: "Week 4", users: 1500, jobs: 980 },
// ];
const buildChartData = (chart) => {
  if (!chart) return [];

  if (Array.isArray(chart)) {
    return chart.map((item, index) => ({
      name: item?.name || `Week ${index + 1}`,
      users: item?.users ?? 0,
      jobs: item?.jobs ?? 0,
    }));
  }

  if (!chart.users?.length && !chart.jobs?.length) {
    return [];
  }

  const weekMap = {};

  chart.users?.forEach((u) => {
    weekMap[u._id] = {
      name: `Week ${u._id}`,
      users: u.users ?? u.count ?? 0,
      jobs: 0,
    };
  });

  chart.jobs?.forEach((j) => {
    if (!weekMap[j._id]) {
      weekMap[j._id] = {
        name: `Week ${j._id}`,
        users: 0,
        jobs: j.jobs ?? j.count ?? 0,
      };
    } else {
      weekMap[j._id].jobs = j.jobs ?? j.count ?? 0;
    }
  });

  return Object.values(weekMap);
};

const Dashboard = () => {
  const { data, isLoading, error } = useGetAdminDashboardQuery();
  const { data: recentActivities, isLoading: recentActivitiesLoading, error: recentActivitiesError } = useGetRecentActivitiesQuery();
  const { data: systemAlerts, isLoading: systemAlertsLoading, error: systemAlertsError } = useGetSystemAlertsQuery();
  const [candidateSearch, setCandidateSearch] = useState("");
  const [candidatePage, setCandidatePage] = useState(1);
  const { data: candidateData, isLoading: candidatesLoading } =
    useGetCandidatesQuery({
      page: candidatePage,
      limit: 8,
      search: candidateSearch,
    });
    if (isLoading) return <p>Loading dashboard...</p>;
  if (error) return <p>Failed to load dashboard</p>;

 
const chartData = buildChartData(data?.chart);
const candidates = candidateData?.data || [];
const candidatePages = candidateData?.pages || 1;


  return (
    <div className="space-y-8 py-2 md:px-0">
      
      
      {/* ===== STATS (REAL DATA) ===== */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Candidates"
          value={data.totalCandidates}
          color="from-indigo-500 to-indigo-700"
        />
        <StatCard
          title="Employers"
          value={data.totalEmployers}
          color="from-sky-500 to-sky-700"
        />
        <StatCard
          title="Active Jobs"
          value={data.totalJobs}
          color="from-emerald-500 to-emerald-700"
        />
        <StatCard
          title="Applications"
          value={data.applications}
          color="from-orange-400 to-orange-600"
        />
      </div>

  
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Admin Info */}
        <div className="bg-white rounded-2xl p-6 shadow-md">
          <div className="flex flex-col items-center text-center">
            <img
              src="https://i.pravatar.cc/150?img=12"
              alt="admin"
              className="w-24 h-24 rounded-full border-4 border-indigo-500"
            />
            <h3 className="mt-4 font-semibold text-lg">Super Admin</h3>
            <p className="text-sm text-gray-500">Platform Administrator</p>
          </div>

          <div className="grid grid-cols-3 gap-4 mt-6 text-center">
            <InfoStat label="Users" value={data.totalCandidates} />
<InfoStat label="Jobs" value={data.totalJobs} />
<InfoStat label="Applications" value={data.applications} />

          </div>
        </div>

        {/* Chart */}
       
        <div className="lg:col-span-2 bg-white rounded-2xl p-6 shadow-md">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-semibold text-lg">
              Platform Activity
            </h3>
            <span className="text-sm text-gray-500">
              Last 30 Days
            </span>
          </div>

          <div className="h-64">
         {chartData.length > 0 ? (
  <ResponsiveContainer width="100%" height="100%">
    <LineChart data={chartData} margin={{ top: 20, right: 30 }}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Line type="monotone" dataKey="users" stroke="#4f46e5" strokeWidth={3} />
      <Line type="monotone" dataKey="jobs" stroke="#10b981" strokeWidth={3} />
    </LineChart>
  </ResponsiveContainer>
) : (
  <p className="text-center text-gray-400">No chart data</p>
)}

          </div>
        </div>
      </div>

     
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        <div className="bg-white rounded-2xl p-6 shadow-md">
          <h3 className="font-semibold text-lg mb-4">Recent Users</h3>
          <ul className="space-y-3 text-sm">
            {recentActivitiesLoading && <p>Loading recent activities...</p>}
            {recentActivities?.map((activity, index) => (
              <Activity key={index} text={activity.text} time={activity.time} />
            ))}
          </ul>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-md">
          <h3 className="font-semibold text-lg mb-4">System Alerts</h3>
          <ul className="space-y-3 text-sm">
            {systemAlertsLoading && <p>Loading system alerts...</p>}
            {systemAlertsError && <p>Failed to load system alerts</p>}
            {systemAlerts?.map((alert, index) => (
              <Alert key={index} text={alert.text} type={alert.type} />
            ))}
            <Alert text="3 jobs pending approval" type="warning" />
            
          </ul>
        </div>
      </div>

     
    </div>
  );
};



const StatCard = ({ title, value, color }) => (
  <div className={`bg-gradient-to-r ${color} text-white rounded-2xl p-6 shadow-lg hover:scale-105 transition`}>
    <p className="text-sm opacity-80">{title}</p>
    <h2 className="text-3xl font-bold mt-2">{value}</h2>
  </div>
);

const InfoStat = ({ label, value }) => (
  <div>
    <div className="text-xl font-bold">{value}</div>
    <div className="text-sm text-gray-500">{label}</div>
  </div>
);

const Activity = ({ text, time }) => (
  <li className="flex justify-between border-b pb-2 last:border-none">
    <span>{text}</span>
    <span className="text-gray-400">{time}</span>
  </li>
);

const Alert = ({ text, type }) => {
  const colors = {
    success: "bg-green-100 text-green-700",
    warning: "bg-yellow-100 text-yellow-700",
    error: "bg-red-100 text-red-700",
  };
  return <li className={`px-4 py-2 rounded-lg ${colors[type]}`}>{text}</li>;
};

export default Dashboard;
