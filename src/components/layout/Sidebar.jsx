import { HomeIcon, ChartBarIcon } from "@heroicons/react/24/outline";
import { IoLogOut, IoSettings } from "react-icons/io5";
import { MdWorkHistory } from "react-icons/md";
import { FaBriefcase, FaChalkboardTeacher } from "react-icons/fa";
import { MdOutlineAdminPanelSettings } from "react-icons/md";
import { HiOutlineLightBulb } from "react-icons/hi2";
import { MdOutlineDashboardCustomize } from "react-icons/md";
import { useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { api } from "../../services/api";
import { getTokenPayload } from "../../utils/jwt";
import { toast } from "react-toastify";
const adminMenu = [
  { label: "Dashboard", to: "/admin", icon: <HomeIcon className="w-5 h-5" /> },
  {
    label: "Employers",
    to: "/admin/employers",
    icon: <MdOutlineAdminPanelSettings size={22} />,
  },
  
  {
    label: "Candidates",
    to: "/admin/candidates",
    icon: <MdOutlineAdminPanelSettings size={22} />,
  },
  {
    label: "Applications",
    to: "/admin/applications",
    icon: <FaBriefcase size={20} />,
  },
  { label: "Jobs", to: "/admin/jobs", icon: <MdWorkHistory size={22} /> },
  {
    label: "Categories",
    to: "/admin/categories",
    icon: <FaChalkboardTeacher size={20} />,
  },
  {
    label: "Skills",
    to: "/admin/skills",
    icon: <HiOutlineLightBulb size={22} />,
  },
  {
    label: "Reports",
    to: "/admin/reports",
    icon: <ChartBarIcon className="w-5 h-5" />,
  },
  {
    label: "CMS",
    to: "/admin/cms",
    icon: <MdOutlineDashboardCustomize size={22} />,
  },
];

const employerMenu = [
  {
    label: "Dashboard",
    to: "/employer",
    icon: <HomeIcon className="w-5 h-5" />,
  },
 
  { label: "My Jobs", to: "/employer/jobs", icon: <MdWorkHistory size={22} /> },
  {
    label: "Applications",
    to: "/employer/applications",
    icon: <ChartBarIcon className="w-5 h-5" />,
  },
   {
    label: "Profile",
    to: "/employer/profile",
    icon: <IoSettings size={22} />,
  },
  {
    label: "Settings",
    to: "/employer/settings",
    icon: <IoSettings size={22} />,
  },
  
];

const candidateMenu = [
  {
    label: "Dashboard",
    to: "/candidate",
    icon: <HomeIcon className="w-5 h-5" />,
  },
  {
    label: "My Jobs",
    to: "/candidate/jobs",
    icon: <MdWorkHistory size={22} />,
  },
  {
    label: "Applications",
    to: "/candidate/applications",
    icon: <ChartBarIcon className="w-5 h-5" />,
  },
  {
    label: "Saved Jobs",
    to: "/candidate/saved-jobs",
    icon: <ChartBarIcon className="w-5 h-5" />,
  },
  {
    label: "Profile",
    to: "/candidate/profile",
    icon: <ChartBarIcon className="w-5 h-5" />,
  },
  {
    label: "Settings",
    to: "/candidate/settings",
    icon: <IoSettings size={22} />,
  },
];

const Sidebar = ({ toggleSidebar, setToggleSidebar }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    if (toggleSidebar) {
      const original = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = original;
      };
    }
    document.body.style.overflow = "";
    return () => {};
  }, [toggleSidebar]);

  //  JWT se role
  const { role } = getTokenPayload(); // ADMIN | EMPLOYER | CANDIDATE

  const menu =
    role === "ADMIN"
      ? adminMenu
      : role === "EMPLOYER"
        ? employerMenu
        : role === "CANDIDATE"
          ? candidateMenu
          : []; //

  const logoutHandle = () => {
    localStorage.removeItem("token");
    dispatch(api.util.resetApiState());
    toast.success("Logout Successfully");
    navigate("/", { replace: true });
  };

  return (
    <>
      {toggleSidebar && (
        <div
          className="fixed inset-0 bg-black/40 z-30 md:hidden"
          onClick={() => setToggleSidebar(false)}
        />
      )}

      <div
        className={`fixed top-0 left-0 h-full w-64 text-white z-40
        transform transition-transform duration-300
        ${toggleSidebar ? "translate-x-0" : "-translate-x-full"}
        ${toggleSidebar ? "bg-[rgb(18,92,82)]" : "bg-[#42a396c8]"}
        md:translate-x-0 md:flex md:flex-col`}
      >
        {/* Logo */}
        <div className="h-20 flex items-center px-6 text-2xl font-bold border-b font-mono">
          JobPortal
        </div>

        {/* Menu */}
        <nav className="flex-1 px-4 overflow-y-auto">
          {menu.map((item, index) => (
            <SidebarItem
              key={index}
              icon={item.icon}
              label={item.label}
              to={item.to}
              onClick={() => setToggleSidebar(false)}
            />
          ))}
        </nav>

        {/* Footer */}
        <div className="flex flex-col items-center gap-2 px-4 py-4 text-xs">
          © 2025 Jobie
          <button
            onClick={logoutHandle}
            className="btn-danger px-3 py-2 text-sm text-white flex items-center justify-center gap-2 cursor-pointer w-full"
          >
            Logout <IoLogOut size={18} />
          </button>
        </div>
      </div>
    </>
  );
};

const SidebarItem = ({ icon, label, to, onClick }) => (
  <NavLink
    to={to}
    onClick={onClick}
    end
    className={({ isActive }) =>
      `flex items-center gap-3 px-3 py-3 mt-3 rounded-lg transition text-sm md:text-base
      ${
        isActive
          ? "bg-black font-semibold"
          : "hover:bg-black/60 hover:scale-105"
      }`
    }
  >
    <div className="w-5 h-5 shrink-0">{icon}</div>
    <span className="break-words">{label}</span>
  </NavLink>
);

export default Sidebar;
