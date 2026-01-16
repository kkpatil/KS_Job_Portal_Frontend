import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useSelector } from "react-redux";

// Layouts
import AuthLayout from "../layouts/AuthLayout";
import AdminLayout from "../layouts/AdminLayout";
import EmployerLayout from "../layouts/EmployerLayout";
import CandidateLayout from "../layouts/CandidateLayout";

// Auth Pages
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import ForgotPassword from "../pages/auth/ForgotPassword.jsx";

// Admin Pages
import AdminDashboard from "../pages/admin/Dashboard.jsx";
import Users from "../pages/admin/Users.jsx";
import Jobs from "../pages/admin/Jobs.jsx";
import Reports from "../pages/admin/Reports.jsx";

// Employer Pages
import EmployerDashboard from "../pages/employer/Dashboard.jsx";
import CompanyProfile from "../pages/employer/CompanyProfile.jsx";
import MyJobs from "../pages/employer/MyJobs.jsx";
import Applications from "../pages/employer/Applications.jsx";

// Candidate Pages
import CandidateDashboard from "../pages/candidate/Dashboard.jsx";
import Profile from "../pages/candidate/Profile.jsx";
import CandidateJobs from "../pages/candidate/Jobs";
import MyApplications from "../pages/candidate/MyApplications";
import SavedJobs from "../pages/candidate/SavedJobs.jsx";

// Public Pages
import Home from "../pages/public/Home";
import JobDetails from "../pages/public/JobDetails";
import NotFound from "../pages/public/NotFound";

// Route Guards
import PrivateRoute from "./PrivateRoute";
import RoleRoute from "./RoleRoute";

const AppRoutes = () => {
  const { user } = useSelector((state) => state.auth);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/jobs/:id" element={<JobDetails />} />

        <Route element={<AuthLayout />}>
          <Route
            path="/login"
            element={!user ? <Login /> : <Navigate to="/dashboard" />}
          />
          <Route
            path="/register"
            element={!user ? <Register /> : <Navigate to="/dashboard" />}
          />
          <Route path="/forgot-password" element={<ForgotPassword />} />
        </Route>

        <Route
          path="/admin"
          element={
            <PrivateRoute>
              <RoleRoute role="admin">
                <AdminLayout />
              </RoleRoute>
            </PrivateRoute>
          }
        >
          <Route index element={<AdminDashboard />} />
          <Route path="users" element={<Users />} />
          <Route path="jobs" element={<Jobs />} />
          <Route path="reports" element={<Reports />} />
        </Route>

        <Route
          path="/employer"
          element={
            <PrivateRoute>
              <RoleRoute role="employer">
                <EmployerLayout />
              </RoleRoute>
            </PrivateRoute>
          }
        >
          <Route index element={<EmployerDashboard />} />
          <Route path="profile" element={<CompanyProfile />} />
          <Route path="jobs" element={<MyJobs />} />
          <Route path="applications" element={<Applications />} />
        </Route>

        <Route
          path="/candidate"
          element={
            <PrivateRoute>
              <RoleRoute role="candidate">
                <CandidateLayout />
              </RoleRoute>
            </PrivateRoute>
          }
        >
          <Route index element={<CandidateDashboard />} />
          <Route path="profile" element={<Profile />} />
          <Route path="jobs" element={<CandidateJobs />} />
          <Route path="applications" element={<MyApplications />} />
          <Route path="saved-jobs" element={<SavedJobs />} />
        </Route>

        <Route
          path="/dashboard"
          element={
            user?.role === "admin" ? (
              <Navigate to="/admin" />
            ) : user?.role === "employer" ? (
              <Navigate to="/employer" />
            ) : user?.role === "candidate" ? (
              <Navigate to="/candidate" />
            ) : (
              <Navigate to="/login" />
            )
          }
        />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
