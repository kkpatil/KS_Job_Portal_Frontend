import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { lazy, Suspense } from "react";
import { getTokenPayload } from "../utils/jwt";

// ================= LAYOUTS (NO LAZY) =================
import AuthLayout from "../layouts/AuthLayout";
import AdminLayout from "../layouts/AdminLayout";
import EmployerLayout from "../layouts/EmployerLayout";
import CandidateLayout from "../layouts/CandidateLayout";
import PrivateRoute from "./PrivateRoute";
import CandidateSettings from "../pages/candidate/CandidateSettings";
import JobDetailsView from "../pages/candidate/JobsDetailsView";
import CompleteEmployerProfile from "../pages/employer/CompleteEmployerProfile";
import HomePage from "../pages/landingpage/Homepage";
import AboutPage from "../pages/landingpage/AboutPage";
import Job from "../pages/landingpage/Job";
import ContactUs from "../pages/landingpage/ContactUs";
import ScrollToTop from "../components/common/ScrollToTop";

import PrivacyPolicy from "../pages/landingpage/privacyPolicy/PrivacyPolicy";


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
const ApplicationsEmployer = lazy(
  () => import("../pages/employer/ApplicationsEmployer"),
);
const EmployerJobDetails = lazy(
  () => import("../pages/employer/EmployerJobDetails"),
);
const JobApplicationsEmployer = lazy(
  () => import("../pages/employer/JobApplicationsEmployer"),
);
const ApplicationsCandidateDetails = lazy(
  () => import("../pages/employer/ApplicationsCandidateDetails"),
);

// ================= CANDIDATE =================
const CandidateDashboard = lazy(() => import("../pages/candidate/Dashboard"));
const Profile = lazy(() => import("../pages/candidate/Profile"));
const CandidateJobs = lazy(() => import("../pages/candidate/Jobs"));
const MyApplications = lazy(() => import("../pages/candidate/MyApplications"));
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
  <div style={{ textAlign: "center", padding: "50px" }}>Loading...</div>
);

const AppRoutes = () => {
  return (
    <Router>
       <ScrollToTop />
      <Suspense fallback={<Loader />}>
        <Routes>
          {/* DEFAULT */}
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/jobs" element={<Job />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/privacy&policy" element={<PrivacyPolicy />} />
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
              <PrivateRoute allowedRoles={["ADMIN"]}>
                <AdminLayout>
                  <AdminDashboard />
                </AdminLayout>
              </PrivateRoute>
            }
          />
          <Route
            path="/admin/employers"
            element={
              <PrivateRoute allowedRoles={["ADMIN"]}>
                <AdminLayout>
                  <Employers />
                </AdminLayout>
              </PrivateRoute>
            }
          />
          <Route
            path="/admin/employers/:id"
            element={
              <PrivateRoute allowedRoles={["ADMIN"]}>
                <AdminLayout>
                  <EmployerDetails />
                </AdminLayout>
              </PrivateRoute>
            }
          />
          <Route
            path="/admin/applications"
            element={
              <PrivateRoute allowedRoles={["ADMIN"]}>
                <AdminLayout>
                  <Applications />
                </AdminLayout>
              </PrivateRoute>
            }
          />
          <Route
            path="/admin/categories"
            element={
              <PrivateRoute allowedRoles={["ADMIN"]}>
                <AdminLayout>
                  <Categories />
                </AdminLayout>
              </PrivateRoute>
            }
          />
          <Route
            path="/admin/skills"
            element={
              <PrivateRoute allowedRoles={["ADMIN"]}>
                <AdminLayout>
                  <Skills />
                </AdminLayout>
              </PrivateRoute>
            }
          />
          <Route
            path="/admin/settings"
            element={
              <PrivateRoute allowedRoles={["ADMIN"]}>
                <AdminLayout>
                  <Settings />
                </AdminLayout>
              </PrivateRoute>
            }
          />
          <Route
            path="/admin/cms"
            element={
              <PrivateRoute allowedRoles={["ADMIN"]}>
                <AdminLayout>
                  <CMS />
                </AdminLayout>
              </PrivateRoute>
            }
          />
          <Route
            path="/admin/jobs"
            element={
              <PrivateRoute allowedRoles={["ADMIN"]}>
                <AdminLayout>
                  <Jobs />
                </AdminLayout>
              </PrivateRoute>
            }
          />
          <Route
            path="/admin/jobs/:id"
            element={
              <PrivateRoute allowedRoles={["ADMIN"]}>
                <AdminLayout>
                  <JobsDetails />
                </AdminLayout>
              </PrivateRoute>
            }
          />
          <Route
            path="/admin/reports"
            element={
              <PrivateRoute allowedRoles={["ADMIN"]}>
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
              <PrivateRoute allowedRoles={["EMPLOYER"]}>
                <EmployerLayout>
                  <EmployerDashboard />
                </EmployerLayout>
              </PrivateRoute>
            }
          />
          <Route
            path="/employer/profile"
            element={
              <PrivateRoute allowedRoles={["EMPLOYER"]}>
                <EmployerLayout>
                  <CompanyProfile />
                </EmployerLayout>
              </PrivateRoute>
            }
          />
          <Route
            path="/employer/jobs"
            element={
              <PrivateRoute allowedRoles={["EMPLOYER"]}>
                <EmployerLayout>
                  <MyJobs />
                </EmployerLayout>
              </PrivateRoute>
            }
          />
          <Route
            path="/employer/jobs/:id"
            element={
              <PrivateRoute allowedRoles={["EMPLOYER"]}>
                <EmployerLayout>
                  <EmployerJobDetails />
                </EmployerLayout>
              </PrivateRoute>
            }
          />
          <Route
            path="/employer/jobs/:id/applications"
            element={
              <PrivateRoute allowedRoles={["EMPLOYER"]}>
                <EmployerLayout>
                  <JobApplicationsEmployer />
                </EmployerLayout>
              </PrivateRoute>
            }
          />
          <Route
            path="/employer/candidates/:id"
            element={
              <PrivateRoute allowedRoles={["EMPLOYER"]}>
                <EmployerLayout>
                  <ApplicationsCandidateDetails />
                </EmployerLayout>
              </PrivateRoute>
            }
          />
          <Route
            path="/employer/applications"
            element={
              <PrivateRoute allowedRoles={["EMPLOYER"]}>
                <EmployerLayout>
                  <ApplicationsEmployer />
                </EmployerLayout>
              </PrivateRoute>
            }
          />
          <Route
            path="/employer/settings"
            element={
              <PrivateRoute allowedRoles={["EMPLOYER"]}>
                <EmployerLayout>
                  <EmployerSettings />
                </EmployerLayout>
              </PrivateRoute>
            }
          />
          <Route
            path="/employer/complete-profile"
            element={
              <PrivateRoute allowedRoles={["EMPLOYER"]}>
                <CompleteEmployerProfile />
              </PrivateRoute>
            }
          />

          {/* CANDIDATE */}
          <Route
            path="/candidate"
            element={
              <PrivateRoute allowedRoles={["CANDIDATE"]}>
                <CandidateLayout>
                  <CandidateDashboard />
                </CandidateLayout>
              </PrivateRoute>
            }
          />
          <Route
            path="/candidate/profile"
            element={
              <PrivateRoute allowedRoles={["CANDIDATE"]}>
                <CandidateLayout>
                  <Profile />
                </CandidateLayout>
              </PrivateRoute>
            }
          />
          <Route
            path="/candidate/jobs"
            element={
              <PrivateRoute allowedRoles={["CANDIDATE"]}>
                <CandidateLayout>
                  <CandidateJobs />
                </CandidateLayout>
              </PrivateRoute>
            }
          />
          <Route
            path="/candidate/jobs/:id"
            element={
              <PrivateRoute allowedRoles={["CANDIDATE"]}>
                <CandidateLayout>
                  <JobDetailsView />
                </CandidateLayout>
              </PrivateRoute>
            }
          />

          <Route
            path="/candidate/applications"
            element={
              <PrivateRoute allowedRoles={["CANDIDATE"]}>
                <CandidateLayout>
                  <MyApplications />
                </CandidateLayout>
              </PrivateRoute>
            }
          />
          <Route
            path="/candidate/saved-jobs"
            element={
              <PrivateRoute allowedRoles={["CANDIDATE"]}>
                <CandidateLayout>
                  <SavedJobs />
                </CandidateLayout>
              </PrivateRoute>
            }
          />
          <Route
            path="/candidate/settings"
            element={
              <PrivateRoute allowedRoles={["CANDIDATE"]}>
                <CandidateLayout>
                  <CandidateSettings />
                </CandidateLayout>
              </PrivateRoute>
            }
          />

          {/* <Route
  path="/dashboard"
  element={
    (() => {
      const payload = getTokenPayload();
      // console.log("Dashboard access payload:", payload);
      if (!payload) {
        return <Navigate to="/login" replace />;
      }

      const { role, profileCompleted } = payload;
      // console.log("Role:", role, "Profile Completed:", profileCompleted);

      if (role === "ADMIN") return <Navigate to="/admin" replace />;

      if (role === "EMPLOYER") {
        return profileCompleted
          ? <Navigate to="/employer" replace />
          : <Navigate to="/employer/complete-profile" replace />;
      }

      if (role === "CANDIDATE") return <Navigate to="/candidate" replace />;

      return <Navigate to="/login" replace />;
    })()
  }
/> */}

          {/* 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </Router>
  );
};

export default AppRoutes;
