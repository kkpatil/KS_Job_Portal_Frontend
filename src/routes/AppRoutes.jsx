// import {
//   BrowserRouter as Router,
//   Routes,
//   Route,
//   Navigate,
// } from "react-router-dom";
// import { useSelector } from "react-redux";

// // Layouts
// import AuthLayout from "../layouts/AuthLayout";
// import AdminLayout from "../layouts/AdminLayout";
// import EmployerLayout from "../layouts/EmployerLayout";
// import CandidateLayout from "../layouts/CandidateLayout";

// // Auth Pages
// import Login from "../pages/auth/Login";
// import Register from "../pages/auth/Register";
// import ForgotPassword from "../pages/auth/ForgotPassword.jsx";

// // Admin Pages
// import AdminDashboard from "../pages/admin/Dashboard.jsx";
// import Users from "../pages/admin/Users.jsx";
// import Jobs from "../pages/admin/Jobs.jsx";
// import Reports from "../pages/admin/Reports.jsx";

// // Employer Pages
// import EmployerDashboard from "../pages/employer/Dashboard.jsx";
// import CompanyProfile from "../pages/employer/CompanyProfile.jsx";
// import MyJobs from "../pages/employer/MyJobs.jsx";
// import Applications from "../pages/employer/Applications.jsx";

// // Candidate Pages
// import CandidateDashboard from "../pages/candidate/Dashboard.jsx";
// import Profile from "../pages/candidate/Profile.jsx";
// import CandidateJobs from "../pages/candidate/Jobs";
// import MyApplications from "../pages/candidate/MyApplications";
// import SavedJobs from "../pages/candidate/SavedJobs.jsx";

// // Public Pages
// import Home from "../pages/public/Home";
// import JobDetails from "../pages/public/JobDetails";
// import NotFound from "../pages/public/NotFound";

// // Route Guards
// import PrivateRoute from "./PrivateRoute";
// import RoleRoute from "./RoleRoute";
// import Dashboard from "../pages/admin/Dashboard.jsx";

// const AppRoutes = () => {
//   const { user } = useSelector((state) => state.auth);

//   return (
//     <Router>
//       <Routes>
//         {/* <Route path="/" element={<Home />} /> */}
//         <Route path="/jobs/:id" element={<JobDetails />} />

//         {/* <Route element={<AuthLayout />}> */}
//           {/* <Route
//             path="/login"
//             element={!user ? <Login /> : <Navigate to="/dashboard" />}
//           />
//           <Route
//             path="/register"
//             element={!user ? <Register /> : <Navigate to="/dashboard" />}
//           /> */}
//           {/* <Route path="/forgot-password" element={<ForgotPassword />} /> */}
//         {/* </Route> */}
//          <Route path="/register" element={<Register />} />
//          <Route element={<AdminLayout />}>
//   <Route path="/dashboard" element={<Dashboard />} />
// </Route>

//         {/* <Route
//           path="/admin"
//           element={
//             // <PrivateRoute>
//               <RoleRoute role="admin">
//               </RoleRoute>
//             // </PrivateRoute>
//           }
//         >
//           <Route index element={<AdminDashboard />} />
//           <Route path="users" element={<Users />} />
//           <Route path="jobs" element={<Jobs />} />
//           <Route path="reports" element={<Reports />} />
//         </Route> */}

//         <Route
//           path="/employer"
//           element={
//             <PrivateRoute>
//               <RoleRoute role="employer">
//                 <EmployerLayout />
//               </RoleRoute>
//             </PrivateRoute>
//           }
//         >
//           <Route index element={<EmployerDashboard />} />
//           <Route path="profile" element={<CompanyProfile />} />
//           <Route path="jobs" element={<MyJobs />} />
//           <Route path="applications" element={<Applications />} />
//         </Route>

//         <Route
//           path="/candidate"
//           element={
//             <PrivateRoute>
//               <RoleRoute role="candidate">
//                 <CandidateLayout />
//               </RoleRoute>
//             </PrivateRoute>
//           }
//         >
//           <Route index element={<CandidateDashboard />} />
//           <Route path="profile" element={<Profile />} />
//           <Route path="jobs" element={<CandidateJobs />} />
//           <Route path="applications" element={<MyApplications />} />
//           <Route path="saved-jobs" element={<SavedJobs />} />
//         </Route>

//         <Route
//           path="/dashboard"
//           element={
//             user?.role === "admin" ? (
//               <Navigate to="/admin" />
//             ) : user?.role === "employer" ? (
//               <Navigate to="/employer" />
//             ) : user?.role === "candidate" ? (
//               <Navigate to="/candidate" />
//             ) : (
//               <Navigate to="/login" />
//             )
//           }
//         />

//         <Route path="*" element={<NotFound />} />
//       </Routes>
//     </Router>
//   );
// };

// export default AppRoutes;


import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

// Layouts
import AuthLayout from "../layouts/AuthLayout";
import AdminLayout from "../layouts/AdminLayout";
import EmployerLayout from "../layouts/EmployerLayout";
import CandidateLayout from "../layouts/CandidateLayout";

// Pages
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import ForgotPassword from "../pages/auth/ForgotPassword";

import AdminDashboard from "../pages/admin/Dashboard";
import Users from "../pages/admin/Users";
import Jobs from "../pages/admin/Jobs";
import Reports from "../pages/admin/Reports";

import EmployerDashboard from "../pages/employer/Dashboard";
import CompanyProfile from "../pages/employer/CompanyProfile";
import MyJobs from "../pages/employer/MyJobs";
import Applications from "../pages/admin/Applications";

import CandidateDashboard from "../pages/candidate/Dashboard";
import Profile from "../pages/candidate/Profile";
import CandidateJobs from "../pages/candidate/Jobs";
import MyApplications from "../pages/candidate/MyApplications";
import SavedJobs from "../pages/candidate/SavedJobs";

import JobDetails from "../pages/public/JobDetails";
import NotFound from "../pages/public/NotFound";
import Employers from "../pages/admin/Employers";
import EmployerDetails from "../pages/admin/EmployerDetails";
import Categories from "../pages/admin/Categories";

/* =========================
   🔥 DUMMY USER (TEMP)
========================= */
const dummyUser = {
  role: "admin", // change to: "employer" | "candidate"
  isLoggedIn: false,
};

const AppRoutes = () => {
  const user = dummyUser;

  return (
    <Router>
      <Routes>
        {/* ================= DEFAULT ================= */}
        <Route path="/" element={<Navigate to="/login" />} />

        {/* ================= PUBLIC ================= */}
        <Route path="/jobs/:id" element={<JobDetails />} />

        {/* ================= AUTH (DUMMY) ================= */}
        <Route
          path="/login"
          element={
            !user?.isLoggedIn ? (
              <AuthLayout>
                <Login />
              </AuthLayout>
            ) : (
              <Navigate to="/admin" />
            )
          }
        />

        <Route
          path="/register"
          element={
            <AuthLayout>
              <Register />
            </AuthLayout>
          }
        />

        <Route
          path="/forgot-password"
          element={
            <AuthLayout>
              <ForgotPassword />
            </AuthLayout>
          }
        />

        {/*ADMIN*/}
        <Route
          path="/admin"
          element={
            <AdminLayout>
              <AdminDashboard />
            </AdminLayout>
          }
        />

        <Route
          path="/admin/employers"
          element={
            <AdminLayout>
              <Employers />
              
            </AdminLayout>
          }
        />

        <Route
          path="/admin/employers/:id"
          element={
            <AdminLayout>
              <EmployerDetails />
              
            </AdminLayout>
          }
        />


        <Route  path="/admin/applications" element={<AdminLayout><Applications/></AdminLayout>}/>
        <Route  path="/admin/categories" element={<AdminLayout><Categories/></AdminLayout>}/>

        <Route
          path="/admin/jobs"
          element={
            <AdminLayout>
              <Jobs />
            </AdminLayout>
          }
        />

        <Route
          path="/admin/reports"
          element={
            <AdminLayout>
              <Reports />
            </AdminLayout>
          }
        />

        {/* ================= EMPLOYER ================= */}
        <Route
          path="/employer"
          element={
            <EmployerLayout>
              <EmployerDashboard />
            </EmployerLayout>
          }
        />

        <Route
          path="/employer/profile"
          element={
            <EmployerLayout>
              <CompanyProfile />
            </EmployerLayout>
          }
        />

        <Route
          path="/employer/jobs"
          element={
            <EmployerLayout>
              <MyJobs />
            </EmployerLayout>
          }
        />

        <Route
          path="/employer/applications"
          element={
            <EmployerLayout>
              <Applications />
            </EmployerLayout>
          }
        />

        {/* ================= CANDIDATE ================= */}
        <Route
          path="/candidate"
          element={
            <CandidateLayout>
              <CandidateDashboard />
            </CandidateLayout>
          }
        />

        <Route
          path="/candidate/profile"
          element={
            <CandidateLayout>
              <Profile />
            </CandidateLayout>
          }
        />

        <Route
          path="/candidate/jobs"
          element={
            <CandidateLayout>
              <CandidateJobs />
            </CandidateLayout>
          }
        />

        <Route
          path="/candidate/applications"
          element={
            <CandidateLayout>
              <MyApplications />
            </CandidateLayout>
          }
        />

        <Route
          path="/candidate/saved-jobs"
          element={
            <CandidateLayout>
              <SavedJobs />
            </CandidateLayout>
          }
        />

        {/* ================= DASHBOARD REDIRECT ================= */}
        <Route
          path="/dashboard"
          element={
            user.role === "admin" ? (
              <Navigate to="/admin" />
            ) : user.role === "employer" ? (
              <Navigate to="/employer" />
            ) : (
              <Navigate to="/candidate" />
            )
          }
        />

        {/* ================= 404 ================= */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
