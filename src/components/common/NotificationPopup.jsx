import {
  useGetMyNotificationsQuery,
  useMarkAsReadMutation,
  useMarkAllAsReadMutation,
} from "../../services/endpoints/notificationApi";
import { MdNotificationsActive } from "react-icons/md";

export default function NotificationPage({ onClose }) {
  const { data } = useGetMyNotificationsQuery();
  const [markAsRead] = useMarkAsReadMutation();
  const [markAllAsRead] = useMarkAllAsReadMutation();

  const notifications = (data?.data || []).slice().sort((a, b) => {
    const aTime = new Date(a.createdAt).getTime();
    const bTime = new Date(b.createdAt).getTime();
    return bTime - aTime;
  });

  const handleReadAll = async () => {
    await markAllAsRead();
  };

  const handleReadOne = async (id) => {
    await markAsRead(id);
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black/60 flex justify-center items-start py-10 px-4 sm:px-6 lg:px-8 overflow-x-hidden"
      onClick={onClose}
    >
      <div
        className="max-w-2xl w-full sm:w-1/2 md:w-1/3 lg:w-1/3 bg-white rounded-xl shadow-2xl flex flex-col overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-4 sm:px-6 py-4 sm:py-5 border-b border-gray-200 flex justify-between items-center">
          <div>
            <h2 className="text-xl sm:text-2xl font-semibold text-black">
              Notifications
            </h2>
            <p className="text-sm sm:text-base text-gray-500">
              You have {notifications.length} notifications
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={handleReadAll}
              className="text-emerald-600 underline text-sm sm:text-base hover:text-emerald-700"
            >
              Read All
            </button>
            <button
              onClick={onClose}
              className="text-gray-500 text-sm sm:text-base hover:text-gray-700"
            >
              Close
            </button>
          </div>
        </div>

        {/* Scrollable Notifications */}
        <div className="flex-1 overflow-y-auto overflow-x-hidden divide-y divide-gray-100">
          {notifications.length === 0 && (
            <div className="p-6 text-center text-sm text-gray-500">
              No notifications yet
            </div>
          )}
          {notifications.map((item) => (
            <Notification
              key={item._id}
              title={item.title}
              desc={item.message}
              time={formatTime(item.createdAt)}
              isRead={item.isRead}
              onClick={() => handleReadOne(item._id)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function Notification({ title, desc, time, isRead, onClick }) {
  return (
    <div
      onClick={onClick}
      className={`flex gap-4 px-4 sm:px-6 py-3 sm:py-4 items-start transform transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:bg-gray-50 hover:-translate-y-1 cursor-pointer group ${
        isRead ? "opacity-70" : "bg-emerald-50/40"
      }`}
    >
      {/* Icon */}
      <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#309689] text-white flex items-center justify-center text-lg sm:text-xl shrink-0 transition-transform duration-300 group-hover:scale-110">
        <MdNotificationsActive />
      </div>

      {/* Content */}
      <div className="flex-1">
        <div className="flex items-center gap-2">
          {!isRead && (
            <span className="inline-flex h-2 w-2 rounded-full bg-emerald-500" />
          )}
          <h4 className="text-sm sm:text-md font-semibold text-black transition-all duration-300 group-hover:font-bold group-hover:text-[#1f7a6f]">
          {title}
          </h4>
          {!isRead && (
            <span className="text-[10px] uppercase tracking-wider text-emerald-600">
              Unread
            </span>
          )}
        </div>
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

function formatTime(dateString) {
  if (!dateString) return "";
  const date = new Date(dateString);
  return date.toLocaleString();
}
