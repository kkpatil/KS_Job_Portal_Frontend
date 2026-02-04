export default function NotificationPage() {
  return (
    <div className="min-h-screen bg-gray-100 flex justify-center py-10 px-4 sm:px-6 lg:px-8 overflow-x-hidden">
      <div className="w-full max-w-full sm:max-w-[90%] md:max-w-[80%] lg:max-w-[70%] bg-white rounded-xl shadow-2xl flex flex-col overflow-hidden">
        {/* Header */}
        <div className="px-4 sm:px-6 py-4 sm:py-5 border-b border-gray-200 flex justify-between items-center">
          <div>
            <h2 className="text-xl sm:text-2xl font-semibold text-black">
              Notifications
            </h2>
            <p className="text-sm sm:text-base text-gray-500">
              You have {notificationsData.length} notifications
            </p>
          </div>
          <a
            href="#"
            className="text-emerald-600 underline text-sm sm:text-base hover:text-emerald-700"
          >
            Read All
          </a>
        </div>

        {/* Scrollable Notifications */}
        <div className="flex-1 overflow-y-auto overflow-x-hidden divide-y divide-gray-100">
          {notificationsData.map((item, index) => (
            <Notification
              key={index}
              icon={item.icon}
              title={item.title}
              desc={item.desc}
              time={item.time}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

const notificationsData = [
  {
    icon: "🔔",
    title: "New message from Jane",
    desc: "Hey, just wanted to follow up on our meeting yesterday.",
    time: "2h ago",
  },
  {
    icon: "📅",
    title: "Upcoming event",
    desc: "Team meeting scheduled for Friday at 2pm.",
    time: "1d ago",
  },
  {
    icon: "✅",
    title: "Task completed",
    desc: 'You completed the "Update website content" task.',
    time: "3d ago",
  },
  {
    icon: "⚠️",
    title: "Account suspended",
    desc: "Your account has been suspended due to a billing issue.",
    time: "1w ago",
  },
  {
    icon: "💡",
    title: "New feature released",
    desc: "Check out the new dashboard analytics feature now available.",
    time: "1w ago",
  },
  {
    icon: "✅",
    title: "Task completed",
    desc: 'You completed the "Update website content" task.',
    time: "3d ago",
  },
  {
    icon: "⚠️",
    title: "Account suspended",
    desc: "Your account has been suspended due to a billing issue.",
    time: "1w ago",
  },
  {
    icon: "💡",
    title: "New feature released",
    desc: "Check out the new dashboard analytics feature now available.",
    time: "1w ago",
  },
  {
    icon: "✅",
    title: "Task completed",
    desc: 'You completed the "Update website content" task.',
    time: "3d ago",
  },
  {
    icon: "⚠️",
    title: "Account suspended",
    desc: "Your account has been suspended due to a billing issue.",
    time: "1w ago",
  },
  {
    icon: "💡",
    title: "New feature released",
    desc: "Check out the new dashboard analytics feature now available.",
    time: "1w ago",
  },
  {
    icon: "✅",
    title: "Task completed",
    desc: 'You completed the "Update website content" task.',
    time: "3d ago",
  },
  {
    icon: "⚠️",
    title: "Account suspended",
    desc: "Your account has been suspended due to a billing issue.",
    time: "1w ago",
  },
  {
    icon: "💡",
    title: "New feature released",
    desc: "Check out the new dashboard analytics feature now available.",
    time: "1w ago",
  },

  {
    icon: "🔔",
    title: "Reminder",
    desc: "Don't forget to submit your timesheet.",
    time: "2w ago",
  },
];

function Notification({ icon, title, desc, time }) {
  return (
    <div className="flex gap-4 px-4 sm:px-6 py-3 sm:py-4 items-start transform transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:bg-gray-50 hover:-translate-y-1 cursor-pointer group">
      {/* Icon */}
      <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#309689] text-white flex items-center justify-center text-lg sm:text-xl shrink-0 transition-transform duration-300 group-hover:scale-110">
        {icon}
      </div>

      {/* Content */}
      <div className="flex-1">
        <h4 className="text-sm sm:text-md font-semibold text-black transition-all duration-300 group-hover:font-bold group-hover:text-[#1f7a6f]">
          {title}
        </h4>
        <p className="text-xs sm:text-sm text-gray-500 mt-1 transition-colors duration-300 group-hover:text-gray-800">
          {desc}
        </p>
      </div>

      {/* Time */}
      <span className="text-xs sm:text-sm text-gray-400 whitespace-nowrap transition-colors duration-300 group-hover:text-gray-600">
        {time}
      </span>
    </div>
  );
}
