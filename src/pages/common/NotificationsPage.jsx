import AdminLayout from "../../layouts/AdminLayout";
import EmployerLayout from "../../layouts/EmployerLayout";
import CandidateLayout from "../../layouts/CandidateLayout";
import NotificationPopup from "../../components/common/NotificationPopup";
import { getTokenPayload } from "../../utils/jwt";

const NotificationsPage = () => {
  const payload = getTokenPayload();
  const role = payload?.role;

  if (role === "ADMIN") {
    return (
      <AdminLayout>
        <NotificationPopup />
      </AdminLayout>
    );
  }

  if (role === "EMPLOYER") {
    return (
      <EmployerLayout>
        <NotificationPopup />
      </EmployerLayout>
    );
  }

  if (role === "CANDIDATE") {
    return (
      <CandidateLayout>
        <NotificationPopup />
      </CandidateLayout>
    );
  }

  return <NotificationPopup />;
};

export default NotificationsPage;
