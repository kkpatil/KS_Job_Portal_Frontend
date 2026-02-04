import React, { useState } from "react";
import {
  FaPhoneAlt,
  FaEnvelope,
  FaClock,
  FaMapMarkerAlt,
} from "react-icons/fa";
import { useSendContactMessageMutation } from "../../../services/endpoints/contactApi";

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: "",
    lastName: "",
    email: "",
    message: "",
  });

  const [sendContactMessage, { isLoading }] = useSendContactMessageMutation();

  // ===== HANDLE CHANGE =====
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ===== SUBMIT =====
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await sendContactMessage({
        firstName: formData.name,
        lastName: formData.lastName,
        email: formData.email,
        message: formData.message,
      }).unwrap();

      alert("Message sent successfully ✅");

      setFormData({
        name: "",
        lastName: "",
        email: "",
        message: "",
      });
    } catch (error) {
      console.error(error);
      alert("Failed to send message ❌");
    }
  };

  return (
    <section className="max-w-7xl mx-auto px-6 py-20">
      <div className="grid lg:grid-cols-2 gap-16 items-start text-center lg:text-left">
        {/* LEFT CONTENT */}
        <div>
          <h2 className="text-3xl md:text-4xl font-semibold text-black mb-5">
            You Will Grow,
            <br /> You Will Succeed. <br />
            We Promise That
          </h2>

          <p className="text-gray-600 text-sm mb-10 max-w-md mx-auto lg:mx-0">
            Pellentesque arcu facilisis nunc mi proin. Dignissim mattis in
            lectus tincidunt tincidunt ultrices.
          </p>

          <div className="grid sm:grid-cols-2 gap-8">
            {[
              {
                icon: <FaPhoneAlt />,
                title: "Call for inquiry",
                value: "+257 388-6895",
              },
              {
                icon: <FaEnvelope />,
                title: "Send us email",
                value: "kramulous@sbcglobal.net",
              },
              {
                icon: <FaClock />,
                title: "Opening hours",
                value: "Mon - Fri: 10AM - 10PM",
              },
              {
                icon: <FaMapMarkerAlt />,
                title: "Office",
                value: "19 North Road Piscataway, NY 08854",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="flex gap-4 items-center justify-center lg:justify-start"
              >
                <span className="text-teal-500 text-xl">{item.icon}</span>
                <div>
                  <p className="font-semibold text-black">{item.title}</p>
                  <p className="text-gray-600 text-sm">{item.value}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT FORM */}
        <div className="bg-teal-50 rounded-2xl p-8">
          <h3 className="text-xl font-semibold text-black mb-2 text-center">
            Contact Info
          </h3>
          <p className="text-gray-500 text-sm text-center mb-8">
            Nibh dis faucibus proin lacus tristique
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-2 gap-4">
              <input
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your name"
                className="w-full px-4 py-3 rounded-lg border"
                required
              />
              <input
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                placeholder="Your last name"
                className="w-full px-4 py-3 rounded-lg border"
                required
              />
            </div>

            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Your E-mail address"
              className="w-full px-4 py-3 rounded-lg border"
              required
            />

            <textarea
              rows="4"
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Your message..."
              className="w-full px-4 py-3 rounded-lg border"
              required
            />

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-teal-600 text-white py-3 rounded-lg"
            >
              {isLoading ? "Sending..." : "Send Message"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
