import { Link, useSearchParams } from "react-router-dom";

const Unsubscribed = () => {
  const [params] = useSearchParams();
  const status = params.get("status") || "success";

  const title =
    status === "invalid"
      ? "Invalid unsubscribe link"
      : status === "not_found"
        ? "Subscription not found"
        : "You're unsubscribed";

  const message =
    status === "invalid"
      ? "The link is missing or expired. Please contact support if you need help."
      : status === "not_found"
        ? "We could not find a subscription for this link."
        : "You will no longer receive updates from Job Portal.";

  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4">
      <div className="max-w-xl w-full bg-white rounded-xl shadow-sm p-6 text-center">
        <h1 className="text-2xl font-semibold mb-3">{title}</h1>
        <p className="text-gray-600 mb-6">{message}</p>
        <div className="flex justify-center gap-3">
          <Link to="/" className="btn-primary px-4 py-2">
            Go to Home
          </Link>
          <Link to="/contact" className="px-4 py-2 border rounded">
            Contact Support
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Unsubscribed;
