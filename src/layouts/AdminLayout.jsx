import { useState } from "react";
import Navbar from "../components/layout/Navbar";
import Sidebar from "../components/layout/Sidebar";

const AdminLayout = ({ children }) => {
  const [toggleSidebar, setToggleSidebar] = useState(false);
  return (
    <div className="flex min-h-screen bg-gray-100 overflow-x-hidden">
        <Sidebar toggleSidebar={toggleSidebar} setToggleSidebar={setToggleSidebar}/>

      <div className="flex-1 flex flex-col">
        <Navbar role="admin" toggleSidebar={toggleSidebar} setToggleSidebar={setToggleSidebar} />

        <main className="flex-1 p-4 sm:p-6 mt-20 lg:ml-64">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
