import React, { useState } from "react";
import { PiBagSimpleFill } from "react-icons/pi";
import { Link } from "react-router-dom";
import { useSubscribeMutation } from "../../../services/endpoints/subscribeApi"; // import your subscriber API

function Footer() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [subscribe, { isLoading }] = useSubscribeMutation();

  const handleSubscribe = async () => {
    if (!email) {
      setMessage("Please enter your email!");
      return;
    }

    try {
      const res = await subscribe(email).unwrap();
      setMessage(res.message || "Subscribed successfully!");
      setEmail("");
    } catch (err) {
      setMessage(err?.data?.message || "Something went wrong");
    }
  };

  return (
    <footer className="bg-black text-gray-300">
      {/* TOP FOOTER */}
      <div className="max-w-7xl mx-auto px-6 py-16 grid gap-10 md:grid-cols-4 text-center md:text-left place-items-center md:place-items-start">
        {/* Column 1 */}
        <div>
          <h4 className="text-white text-lg font-semibold mb-4 flex items-center gap-3 justify-center md:justify-start">
            <PiBagSimpleFill className="text-xl" />
            Job Portal
          </h4>
          <p className="text-sm leading-relaxed">
            Job Portal is a modern hiring platform that
            <br /> connects talented candidates with trusted
            <br /> employers and opportunities worldwide.
          </p>
        </div>

        {/* Column 2 */}
        <div>
          <h4 className="text-white text-lg font-semibold mb-4">Company</h4>
          <ul className="space-y-2 text-sm">
            <li>
              <Link to="/" className="hover:text-white">
                Home
              </Link>
            </li>
            <li>
              <Link to="/jobs" className="hover:text-white">
                Job
              </Link>
            </li>
            <li>
              <Link to="/about" className="hover:text-white">
                About Us
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-white">
                Contact Us
              </Link>
            </li>
          </ul>
        </div>

        {/* Column 3 */}
        <div>
          <h4 className="text-white text-lg font-semibold mb-4">
            Job Categories
          </h4>
          <ul className="space-y-2 text-sm text-center md:text-left">
            <li>
              <Link to="/jobs" className="hover:text-white cursor-pointer">
                IT & SOFTWARE
              </Link>
            </li>
            <li>
              <Link to="/jobs" className="hover:text-white cursor-pointer">
                Agriculture
              </Link>
            </li>
            <li>
              <Link to="/jobs" className="hover:text-white cursor-pointer">
                Metal Production
              </Link>
            </li>
            <li>
              <Link to="/jobs" className="hover:text-white cursor-pointer">
                Commerce
              </Link>
            </li>
            <li>
              <Link to="/jobs" className="hover:text-white cursor-pointer">
                Construction
              </Link>
            </li>
          </ul>
        </div>

        {/* Column 4: Newsletter */}
        <div>
          <h4 className="text-white text-lg font-semibold mb-4">Newsletter</h4>
          <p className="text-sm mb-4">
            Subscribe to get latest job updates and career tips directly in your
            inbox.
          </p>

          <div className="flex flex-col gap-2">
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 rounded-[7px] bg-black text-white placeholder-gray-400 border border-white outline-none hover:ring-2 focus:ring-2 focus:ring-white mb-3"
            />
            <button
              onClick={handleSubscribe}
              disabled={isLoading}
              className="bg-[#309689] w-full text-white px-4 py-2 rounded-[7px] hover:ring-2 border-white transition"
            >
              {isLoading ? "Subscribing..." : "Subscribe"}
            </button>
            {message && <p className="text-sm mt-2 text-gray-200">{message}</p>}
          </div>
        </div>
      </div>

      {/* BOTTOM FOOTER */}
      <div className="border-t border-gray-700">
        <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col md:flex-row justify-between items-center text-sm gap-3 text-center md:text-left">
          <p className="text-gray-500">
            © Copyright Job Portal 2026. Designed by{" "}
            {/* <span className="font-semibold">Krishaa IT Soft Solutions</span> */}
          </p>
          <div className="flex gap-6">
            <Link to="/privacy&policy" className="underline hover:text-white">
              Privacy Policy
            </Link>
            <Link to="/terms&conditions" className="underline hover:text-white">
              Terms & Conditions
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
