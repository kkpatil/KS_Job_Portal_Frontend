const Dashboard = () => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Total Users" value="12,540" color="bg-[#4E36E2]" />
        <StatCard title="Employers" value="1,248" color="bg-[#48A9F8]" />
        <StatCard title="Active Jobs" value="3,486" color="bg-[#1BCF85]" />
        <StatCard title="Reports" value="93" color="bg-[#FFA500]" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="flex flex-col items-center text-center">
            <img
              src=""
              alt="admin"
              className="w-24 h-24 rounded-full border-4 border-indigo-500"
            />
            <h3 className="mt-4 font-semibold text-lg">Super Admin</h3>
            <p className="text-sm text-gray-500">Platform Administrator</p>
          </div>

          <div className="grid grid-cols-3 gap-4 mt-6 text-center">
            <InfoStat label="Users" value="12k+" />
            <InfoStat label="Jobs" value="3.4k" />
            <InfoStat label="Reports" value="93" /> 
          </div>
        </div>

        <div className="lg:col-span-2 bg-white rounded-xl p-6 shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-semibold text-lg">Platform Activity</h3>
            <span className="text-sm text-gray-500">Last 30 Days</span>
          </div>

          <div className="h-64 flex items-center justify-center border border-dashed rounded-lg text-gray-400">
             Admin Analytics Chart
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Users */}
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <h3 className="font-semibold text-lg mb-4">Recent Users</h3>

          <ul className="space-y-3 text-sm">
            <Activity text="New employer registered" time="5 min ago" />
            <Activity text="Candidate account approved" time="20 min ago" />
            <Activity text="Job posted by Employer" time="1 hour ago" />
            <Activity text="User account blocked" time="3 hours ago" />
          </ul>
        </div>

        {/* System Alerts */}
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <h3 className="font-semibold text-lg mb-4">System Alerts</h3>

          <ul className="space-y-3 text-sm">
            <Alert text="3 jobs pending approval" type="warning" />
            <Alert text="Payment gateway delay" type="error" />
            <Alert text="Database backup completed" type="success" />
          </ul>
        </div>
      </div>
    </div>
  );
};


const StatCard = ({ title, value, color }) => (
  <div className={`${color} text-white rounded-xl p-6 shadow-sm`}>
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
  <li className="flex justify-between border-b pb-2">
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

  return (
    <li className={`px-4 py-2 rounded ${colors[type]}`}>
      {text}
    </li>
  );
};

export default Dashboard;
