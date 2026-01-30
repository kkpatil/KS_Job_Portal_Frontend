import { useState } from "react";
import {
  BellIcon,
  ChatBubbleLeftIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import { MdMenuOpen, MdNotificationImportant } from "react-icons/md";

import {
  useGetMyNotificationsQuery,
  useMarkAsReadMutation,
  useMarkAllAsReadMutation,
} from "../../services/endpoints/notificationApi";

import { useGetMyProfileQuery } from "../../services/endpoints/profileApi";

const Navbar = ({ toggleSidebar, setToggleSidebar }) => {
  const [openDropdown, setOpenDropdown] = useState(null);

  /* ================= API ================= */
  const { data } = useGetMyNotificationsQuery();
  const [markAsRead] = useMarkAsReadMutation();
  const [markAllAsRead] = useMarkAllAsReadMutation();

  const { data: profileData } = useGetMyProfileQuery();

  const user = profileData?.data;
  const role = user?.role;

  const notifications = data?.data || [];
  const unreadCount = notifications.filter((n) => !n.isRead).length;

  const toggleSidebarHandle = () => {
    setToggleSidebar((prev) => !prev);
  };

  const handleNotificationClick = async (id) => {
    await markAsRead(id);
  };

  const handleMarkAllRead = async () => {
    await markAllAsRead();
  };

  const roleLabel = {
    ADMIN: "Administrator",
    EMPLOYER: "Employer",
    CANDIDATE: "Candidate",
  };

  const roleAvatar = {
    ADMIN: "https://i.pravatar.cc/40?img=1",
    EMPLOYER: "https://i.pravatar.cc/40?img=5",
    CANDIDATE: "https://i.pravatar.cc/40?img=8",
  };

  return (
    <>
      <div className="h-20 bg-linear-to-l from-[#eee9eb] to-[#ffff] flex items-center justify-between px-6 shadow-sm fixed top-0 left-0 md:left-64 right-0 z-50">
        {/* LEFT */}
        <div className="flex items-center gap-4">
          <MdMenuOpen
            size={28}
            className="md:hidden cursor-pointer"
            onClick={toggleSidebarHandle}
          />

          {/* <div className="hidden md:flex bg-gray-100 px-4 py-2 rounded-full w-96">
            <MagnifyingGlassIcon className="w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search..."
              className="bg-transparent outline-none px-3 text-sm w-full"
            />
          </div> */}
        </div>

        {/* RIGHT */}
        <div className="flex items-center gap-6 relative">
          {/* MESSAGES (future use) */}
          <IconWithBadge icon={<ChatBubbleLeftIcon />} count={0} />

          {/* NOTIFICATIONS */}
          <div
            onClick={() =>
              setOpenDropdown(
                openDropdown === "notifications" ? null : "notifications",
              )
            }
          >
            {role === "ADMIN" && (
              <IconWithBadge icon={<BellIcon />} count={unreadCount} />
            )}

            {role === "EMPLOYER" && (
              <IconWithBadge icon={<ChatBubbleLeftIcon />} count={0} />
            )}
          </div>

          {/* PROFILE */}
          <div className="flex items-center gap-3 cursor-pointer">
            <img
              src={
                user?.avatar
                  ? `${import.meta.env.VITE_API_URL}/${user.avatar}`
                  : roleAvatar[role]
              }
              alt="profile"
              className="w-10 h-10 rounded-full object-cover"
            />

            <div className="text-sm">
              <p className="font-semibold">{user?.name || "User"}</p>
              <p className="text-gray-400 text-xs">{roleLabel[role]}</p>
            </div>
          </div>

          {/* NOTIFICATION DROPDOWN */}
          {openDropdown === "notifications" && (
            <Dropdown title="Notifications" onClear={handleMarkAllRead}>
              {notifications.length === 0 && (
                <p className="text-sm text-gray-400">No notifications</p>
              )}

              {notifications.map((note) => (
                <div
                  key={note._id}
                  onClick={() => handleNotificationClick(note._id)}
                  className={`flex gap-3 items-start cursor-pointer p-2 rounded ${
                    note.isRead ? "opacity-60" : "bg-gray-50"
                  }`}
                >
                  <MdNotificationImportant size={18} className="mt-1" />
                  <div>
                    <p className="font-medium text-sm">{note.title}</p>
                    <p className="text-xs text-gray-500">{note.message}</p>
                  </div>
                </div>
              ))}
            </Dropdown>
          )}
        </div>
      </div>

      {/* OVERLAY */}
      {openDropdown && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setOpenDropdown(null)}
        />
      )}
    </>
  );
};

/* ================= HELPERS ================= */

const IconWithBadge = ({ icon, count }) => (
  <div className="relative cursor-pointer">
    <div className="w-6 h-6 text-gray-600">{icon}</div>
    {count > 0 && (
      <span className="absolute -top-2 -right-2 bg-purple-600 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
        {count}
      </span>
    )}
  </div>
);

const Dropdown = ({ title, children, onClear }) => (
  <div className="absolute top-14 right-0 w-80 bg-white rounded-lg shadow-lg p-4 z-50">
    <div className="flex justify-between items-center mb-3">
      <h4 className="font-semibold">{title}</h4>
      {onClear && (
        <button onClick={onClear} className="text-xs text-indigo-600">
          Mark all read
        </button>
      )}
    </div>
    <div className="space-y-2 max-h-80 overflow-y-auto">{children}</div>
  </div>
);

export default Navbar;
