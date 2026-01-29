import React from "react";
import {
  FaPhoneAlt,
  FaEnvelope,
  FaClock,
  FaMapMarkerAlt,
} from "react-icons/fa";

const ContactSection = () => {
  return (
    <section className="max-w-7xl mx-auto px-6 py-20">
      <div className="grid lg:grid-cols-2 gap-16 items-start text-center lg:text-left">
        {/* Left Content */}
        <div>
          <h2
            className="
              text-3xl md:text-4xl font-semibold text-black mb-5 leading-snug
              transition-all duration-300
              hover:font-bold hover:scale-[1.02]
              text-center lg:text-left
            "
          >
            You Will Grow,
            <br /> You Will Succeed. <br />
            We Promise That
          </h2>

          <p className="text-gray-600 text-sm mb-10 max-w-md mt-5  mx-auto lg:mx-0">
            Pellentesque arcu facilisis nunc mi proin. Dignissim mattis in
            lectus tincidunt tincidunt ultrices. Diam convallis morbi
            pellentesque adipiscing
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
                className="
                  flex gap-4 group cursor-pointer
                  transition-all duration-300
                  hover:-translate-y-1
                   items-center
    justify-center lg:justify-start
    text-center lg:text-left
                "
              >
                <span
                  className="
                    text-teal-500 text-xl
                    transition-all duration-300
                    group-hover:scale-110 group-hover:rotate-6
                  "
                >
                  {item.icon}
                </span>
                <div>
                  <p
                    className="
                      font-semibold text-black
                      transition-all duration-300
                      group-hover:font-bold
                    "
                  >
                    {item.title}
                  </p>
                  <p className="text-gray-600 text-sm">{item.value}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Form */}
        <div
          className="
            bg-teal-50 rounded-2xl p-8
            transition-all duration-300
            hover:shadow-xl hover:-translate-y-1
          "
        >
          <h3 className="text-xl font-semibold text-black mb-2 text-center">
            Contact Info
          </h3>
          <p className="text-gray-500 text-sm text-center mb-8">
            Nibh dis faucibus proin lacus tristique
          </p>

          <form className="space-y-5">
            <div className="grid grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Your name"
                className="
                  w-full px-4 py-3 rounded-lg border outline-none
                  transition-all duration-300
                  focus:border-teal-500
                  focus:shadow-[0_0_0_2px_rgba(20,184,166,0.3)]
                "
              />
              <input
                type="text"
                placeholder="Your last name"
                className="
                  w-full px-4 py-3 rounded-lg border outline-none
                  transition-all duration-300
                  focus:border-teal-500
                  focus:shadow-[0_0_0_2px_rgba(20,184,166,0.3)]
                "
              />
            </div>

            <input
              type="email"
              placeholder="Your E-mail address"
              className="
                w-full px-4 py-3 rounded-lg border outline-none
                transition-all duration-300
                focus:border-teal-500
                focus:shadow-[0_0_0_2px_rgba(20,184,166,0.3)]
              "
            />

            <textarea
              rows="4"
              placeholder="Your message..."
              className="
                w-full px-4 py-3 rounded-lg border outline-none
                transition-all duration-300
                focus:border-teal-500
                focus:shadow-[0_0_0_2px_rgba(20,184,166,0.3)]
              "
            />

            <button
              type="submit"
              className="
                w-full bg-teal-600 text-white py-3 rounded-lg font-medium
                transition-all duration-300
                hover:bg-teal-700 hover:scale-105 hover:font-semibold
                active:scale-95
              "
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
