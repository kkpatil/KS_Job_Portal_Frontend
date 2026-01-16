import {
  HomeIcon,
  ChartBarIcon,
} from "@heroicons/react/24/outline";
import { IoSettings } from "react-icons/io5";
import { MdWorkHistory } from "react-icons/md";
import { FaBriefcase, FaChalkboardTeacher } from "react-icons/fa";
import { MdOutlineAdminPanelSettings } from "react-icons/md";
import { HiOutlineLightBulb } from "react-icons/hi2";
import { MdOutlineDashboardCustomize } from "react-icons/md";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="w-64 min-h-screen bg-linear-to-t from-[#566538] to-[#2c371a] text-white flex flex-col fixed top-0 left-0">
      {/* Logo */}
      <div className="h-20 flex items-center px-6 text-2xl font-bold border-b  font-mono">
        Jobie
      </div>

      {/* Menu */}
      <nav className="flex-1 px-4 space-y-2">
        <SidebarItem icon={<HomeIcon className="w-5 h-5" />} label="Dashboard" to="/admin" />
        <SidebarItem icon={<MdOutlineAdminPanelSettings size={22} />} label="Employers" to="/admin/employers" />
        <SidebarItem icon={<FaBriefcase size={20} />} label="Applications" to="/admin/applications" />
        <SidebarItem icon={<MdWorkHistory size={22} />} label="Jobs" to="/admin/jobs" />
        <SidebarItem icon={<FaChalkboardTeacher size={20} />} label="Categories" to="/admin/categories" />
        <SidebarItem icon={<HiOutlineLightBulb size={22} />} label="Skills" to="/admin/skills" />
        <SidebarItem icon={<ChartBarIcon className="w-5 h-5" />} label="Reports" to="/admin/reports" />
        <SidebarItem icon={<MdOutlineDashboardCustomize size={22} />} label="CMS" to="/admin/cms" />
        <SidebarItem icon={<IoSettings size={22} />} label="Settings" to="/admin/settings" />
      </nav>

      {/* Footer */}
      <div className="px-6 py-4 text-xs opacity-60">
        © 2025 Jobie
      </div>
    </div>
  );
};

const SidebarItem = ({ icon, label, to }) => (
  <NavLink
    to={to}
    end
    className={({ isActive }) =>
      `flex items-center gap-4 px-4 py-3 rounded-lg cursor-pointer transition
      ${isActive ? "bg-[#728154] font-semibold" : "hover:bg-[#5a6b3d] hover:text-white"}`
    }
  >
    <div className="w-5 h-5">{icon}</div>
    <span>{label}</span>
  </NavLink>
);

export default Sidebar;
