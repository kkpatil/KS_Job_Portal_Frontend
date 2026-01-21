import {
  BellIcon,
  ChatBubbleLeftIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import { useState } from "react";
import {
  MdMessage,
  MdNotificationImportant,
  MdMenuOpen,
} from "react-icons/md";

const Navbar = ({ role = "admin",toggleSidebar ,setToggleSidebar }) => {
  const [openDropdown, setOpenDropdown] = useState(null);
 
  const toggleSidebarHandle = () => {
    setToggleSidebar(()=>!toggleSidebar);
  }
  const config = roleConfig[role];

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

          <div className="hidden md:flex bg-gray-100 px-4 py-2 rounded-full w-96">
            <MagnifyingGlassIcon className="w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search..."
              className="bg-transparent outline-none px-3 text-sm w-full"
            />
          </div>
        </div>

        {/* RIGHT */}
        <div className="flex items-center gap-6 relative">
          
          {/* MESSAGES */}
          <div onClick={() => setOpenDropdown(openDropdown === "messages" ? null : "messages")}>
            <IconWithBadge icon={<ChatBubbleLeftIcon />} count={config.messages.length} />
          </div>

          {/* NOTIFICATIONS */}
          <div onClick={() => setOpenDropdown(openDropdown === "notifications" ? null : "notifications")}>
            <IconWithBadge icon={<BellIcon />} count={config.notifications.length} />
          </div>

          {/* PROFILE */}
          <div className="flex items-center gap-3 cursor-pointer">
            <img
              src="https://i.pravatar.cc/40"
              alt="profile"
              className="w-10 h-10 rounded-full"
            />
            <div className="text-sm">
              <p className="font-semibold">Oda Dink</p>
              <p className="text-gray-400 text-xs">{config.roleLabel}</p>
            </div>
          </div>

          {/* DROPDOWNS */}
          {openDropdown === "messages" && (
            <Dropdown title="Messages">
              {config.messages.map((msg, i) => (
                <p key={i} className="flex gap-3 items-center">
                  <MdMessage size={18} />
                  {msg}
                </p>
              ))}
            </Dropdown>
          )}

          {openDropdown === "notifications" && (
            <Dropdown title="Notifications">
              {config.notifications.map((note, i) => (
                <p key={i} className="flex gap-3 items-center">
                  <MdNotificationImportant color="#ff0000" size={18} />
                  {note}
                </p>
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

const Dropdown = ({ title, children }) => (
  <div className="absolute top-14 right-0 w-72 bg-white rounded-lg shadow-lg p-4 z-50">
    <h4 className="font-semibold mb-3">{title}</h4>
    <div className="space-y-2 text-sm text-gray-600">
      {children}
    </div>
  </div>
);

/* ================= ROLE CONFIG ================= */

const roleConfig = {
  admin: {
    roleLabel: "Super Admin",
    messages: [
      "New message from Rahul",
      "Interview update",
      "HR replied",
    ],
    notifications: [
      "New job posted",
      "Profile approved",
      "New application received",
    ],
  },

  employer: {
    roleLabel: "Employer",
    messages: ["Candidate applied", "Interview scheduled"],
    notifications: ["New application received", "Job approved"],
  },

  candidate: {
    roleLabel: "Candidate",
    messages: ["Recruiter messaged you"],
    notifications: ["Application shortlisted", "New job recommendation"],
  },
};

export default Navbar;
