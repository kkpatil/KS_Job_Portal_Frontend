import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { lazy, Suspense } from "react";

// ================= LAYOUTS (NO LAZY) =================
import AuthLayout from "../layouts/AuthLayout";
import AdminLayout from "../layouts/AdminLayout";
import EmployerLayout from "../layouts/EmployerLayout";
import CandidateLayout from "../layouts/CandidateLayout";
import PrivateRoute from "./PrivateRoute";
import CandidateSettings from "../pages/candidate/CandidateSettings";
import JobDetailsView from "../pages/candidate/JobsDetailsView";

// ================= AUTH =================
const Login = lazy(() => import("../pages/auth/Login"));
const Register = lazy(() => import("../pages/auth/Register"));
const ForgotPassword = lazy(() => import("../pages/auth/ForgotPassword"));

// ================= ADMIN =================
const AdminDashboard = lazy(() => import("../pages/admin/Dashboard"));
const Employers = lazy(() => import("../pages/admin/Employers"));
const EmployerDetails = lazy(() => import("../pages/admin/EmployerDetails"));
const Applications = lazy(() => import("../pages/admin/Applications"));
const Categories = lazy(() => import("../pages/admin/Categories"));
const Skills = lazy(() => import("../pages/admin/Skills"));
const Settings = lazy(() => import("../pages/admin/Settings"));
const CMS = lazy(() => import("../pages/admin/CMS"));
const Jobs = lazy(() => import("../pages/admin/Jobs"));
const JobsDetails = lazy(() => import("../pages/admin/JobsDetails"));
const Reports = lazy(() => import("../pages/admin/Reports"));

// ================= EMPLOYER =================
const EmployerDashboard = lazy(() => import("../pages/employer/Dashboard"));
const CompanyProfile = lazy(() => import("../pages/employer/CompanyProfile"));
const MyJobs = lazy(() => import("../pages/employer/MyJobs"));
const EmployerSettings = lazy(() => import("../pages/employer/Settings"));
const ApplicationsEmployer = lazy(() =>
  import("../pages/employer/ApplicationsEmployer")
);
const EmployerJobDetails = lazy(() =>
  import("../pages/employer/EmployerJobDetails")
);
const JobApplicationsEmployer = lazy(() =>
  import("../pages/employer/JobApplicationsEmployer")
);
const ApplicationsCandidateDetails = lazy(() =>
  import("../pages/employer/ApplicationsCandidateDetails")
);

// ================= CANDIDATE =================
const CandidateDashboard = lazy(() =>
  import("../pages/candidate/Dashboard")
);
const Profile = lazy(() => import("../pages/candidate/Profile"));
const CandidateJobs = lazy(() => import("../pages/candidate/Jobs"));
const MyApplications = lazy(() =>
  import("../pages/candidate/MyApplications")
);
const SavedJobs = lazy(() => import("../pages/candidate/SavedJobs"));

// ================= PUBLIC =================
const NotFound = lazy(() => import("../pages/public/NotFound"));

// ================= DUMMY USER =================
const dummyUser = {
  role: "admin", // admin | employer | candidate
  isLoggedIn: true,
};

// ================= LOADER =================
const Loader = () => (
  <div style={{ textAlign: "center", padding: "50px" }}>
    Loading...
  </div>
);

const AppRoutes = () => {
  const user = dummyUser;

  return (
    <Router>
      <Suspense fallback={<Loader />}>
        <Routes>
          {/* DEFAULT */}
          <Route path="/" element={<Navigate to="/login" />} />

          {/* AUTH */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/forgot-password"
            element={
              <AuthLayout>
                <ForgotPassword />
              </AuthLayout>
            }
          />

          {/* ADMIN */}
          <Route
            path="/admin"
            element={
              <PrivateRoute allowedRoles={["admin"]}>
                <AdminLayout>
                  <AdminDashboard />
                </AdminLayout>
              </PrivateRoute>
            }
          />
          <Route
            path="/admin/employers"
            element={
              <PrivateRoute allowedRoles={["admin"]}>
                <AdminLayout>
                  <Employers />
                </AdminLayout>
              </PrivateRoute>
            }
          />
          <Route
            path="/admin/employers/:id"
            element={
              <PrivateRoute  allowedRoles={["admin"]}>
                <AdminLayout>
                  <EmployerDetails />
                </AdminLayout>
              </PrivateRoute>
            }
          />
          <Route
            path="/admin/applications"
            element={
              <PrivateRoute allowedRoles={["admin"]}>
                <AdminLayout>
                  <Applications />
                </AdminLayout>
              </PrivateRoute>
            }
          />
          <Route
            path="/admin/categories"
            element={
              <PrivateRoute allowedRoles={["admin"]}>
                <AdminLayout>
                  <Categories />
                </AdminLayout>
              </PrivateRoute>
            }
          />
          <Route
            path="/admin/skills"
            element={
              <PrivateRoute allowedRoles={["admin"]}>
                <AdminLayout>
                  <Skills />
                </AdminLayout>
              </PrivateRoute>
            }
          />
          <Route
            path="/admin/settings"
            element={
              <PrivateRoute allowedRoles={["admin"]}>
                <AdminLayout>
                  <Settings />
                </AdminLayout>
              </PrivateRoute>
            }
          />
          <Route
            path="/admin/cms"
            element={
              <PrivateRoute allowedRoles={["admin"]}>
                <AdminLayout>
                  <CMS />
                </AdminLayout>
              </PrivateRoute>
            }
          />
          <Route
            path="/admin/jobs"
            element={
              <PrivateRoute allowedRoles={["admin"]}>
                <AdminLayout>
                  <Jobs />
                </AdminLayout>
              </PrivateRoute>
            }
          />
          <Route
            path="/admin/jobs/:id"
            element={
              <PrivateRoute allowedRoles={["admin"]}>
                <AdminLayout>
                  <JobsDetails />
                </AdminLayout>
              </PrivateRoute>
            }
          />
          <Route
            path="/admin/reports"
            element={
              <PrivateRoute allowedRoles={["admin"]}>
                <AdminLayout>
                  <Reports />
                </AdminLayout>
              </PrivateRoute>
            }
          />

          {/* EMPLOYER */}
          <Route
            path="/employer"
            element={
              <PrivateRoute allowedRoles={["employer"]}>
                <EmployerLayout>
                  <EmployerDashboard />
                </EmployerLayout>
              </PrivateRoute>
            }
          />
          <Route
            path="/employer/profile"
            element={
              <PrivateRoute allowedRoles={["employer"]}>
                <EmployerLayout>
                  <CompanyProfile />
                </EmployerLayout>
              </PrivateRoute>
            }
          />
          <Route
            path="/employer/jobs"
            element={
              <PrivateRoute allowedRoles={["employer"]}>
                <EmployerLayout>
                  <MyJobs />
                </EmployerLayout>
              </PrivateRoute>
            }
          />
          <Route
            path="/employer/jobs/:id"
            element={
              <PrivateRoute allowedRoles={["employer"]}>
                <EmployerLayout>
                  <EmployerJobDetails />
                </EmployerLayout>
              </PrivateRoute>
            }
          />
          <Route
            path="/employer/jobs/:id/applications"
            element={
              <PrivateRoute allowedRoles={["employer"]}>
                <EmployerLayout>
                  <JobApplicationsEmployer />
                </EmployerLayout>
              </PrivateRoute>
            }
          />
          <Route
            path="/employer/candidates/:id"
            element={
              <PrivateRoute allowedRoles={["employer"]}>
                <EmployerLayout>
                  <ApplicationsCandidateDetails />
                </EmployerLayout>
              </PrivateRoute>
            }
          />
          <Route
            path="/employer/applications"
            element={
              <PrivateRoute allowedRoles={["employer"]}>
                <EmployerLayout>
                  <ApplicationsEmployer />
                </EmployerLayout>
              </PrivateRoute>
            }
          />
          <Route
            path="/employer/settings"
            element={
              <PrivateRoute allowedRoles={["employer"]}>
                <EmployerLayout>
                  <EmployerSettings />
                </EmployerLayout>
              </PrivateRoute>
            }
          />

          {/* CANDIDATE */}
          <Route
            path="/candidate"
            element={
              <PrivateRoute allowedRoles={["candidate"]}>
                <CandidateLayout>
                  <CandidateDashboard />
                </CandidateLayout>
              </PrivateRoute>
            }
          />
          <Route
            path="/candidate/profile"
            element={
              <PrivateRoute allowedRoles={["candidate"]}>
                <CandidateLayout>
                  <Profile />
                </CandidateLayout>
              </PrivateRoute>
            }
          />
          <Route
            path="/candidate/jobs"
            element={
              <PrivateRoute allowedRoles={["candidate"]}>
                <CandidateLayout>
                  <CandidateJobs />
                </CandidateLayout>
              </PrivateRoute>
            }
          />
          <Route 
            path="candidate/jobs/:id"
            element= {
              <PrivateRoute allowedRoles={["candidate"]}>
                <CandidateLayout>
                  <JobDetailsView />
                </CandidateLayout>
              </PrivateRoute>
            }
          />
          
          <Route
            path="/candidate/applications"
            element={
              <PrivateRoute allowedRoles={["candidate"]}>
                <CandidateLayout>
                  <MyApplications />
                </CandidateLayout>
              </PrivateRoute>
            }
          />
          <Route
            path="/candidate/saved-jobs"
            element={
              <PrivateRoute allowedRoles={["candidate"]}>
                <CandidateLayout>
                  <SavedJobs />
                </CandidateLayout>
              </PrivateRoute>
            }
          />
          <Route
            path="/candidate/settings"
            element={
              <PrivateRoute allowedRoles={["candidate"]}>
                <CandidateLayout>
                  <CandidateSettings />
                </CandidateLayout>
              </PrivateRoute>
            }
          />

          {/* DASHBOARD REDIRECT */}
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

          {/* 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </Router>
  );
};

export default AppRoutes;
