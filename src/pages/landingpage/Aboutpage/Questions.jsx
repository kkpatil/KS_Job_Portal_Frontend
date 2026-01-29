import React, { useState } from "react";
import { FaPlus, FaTimes } from "react-icons/fa";

const faqs = [
  {
    id: "01",
    question: "Can I upload a CV?",
    answer:
      "Nunc sed a nisl purus. Nibh dis faucibus proin lacus tristique. Sit congue non vitae odio sit erat in. Felis eu ultrices a sed massa. Commodo fringilla sed tempor risus laoreet ultrices ipsum. Habitasse morbi faucibus in iaculis lectus. Nisi enim feugiat enim volutpat. Sem quis viverra viverra odio mauris nunc.",
  },
  {
    id: "02",
    question: "How long will the recruitment process take?",
    answer:
      "Nunc sed a nisl purus. Nibh dis faucibus proin lacus tristique. Sit congue non vitae odio sit erat in. Felis eu ultrices a sed massa. Commodo fringilla sed tempor risus laoreet ultrices ipsum. Habitasse morbi faucibus in iaculis lectus. Nisi enim feugiat enim volutpat. Sem quis viverra viverra odio mauris nunc.",
  },
  {
    id: "04",
    question: "Do you recruit for Graduates, Apprentices and Students?",
    answer:
      "Nunc sed a nisl purus. Nibh dis faucibus proin lacus tristique. Sit congue non vitae odio sit erat in. Felis eu ultrices a sed massa. Commodo fringilla sed tempor risus laoreet ultrices ipsum. Habitasse morbi faucibus in iaculis lectus. Nisi enim feugiat enim volutpat. Sem quis viverra viverra odio mauris nunc.",
  },
  {
    id: "03",
    question: "What does the recruitment and selection process involve?",
    answer:
      "Nunc sed a nisl purus. Nibh dis faucibus proin lacus tristique. Sit congue non vitae odio sit erat in. Felis eu ultrices a sed massa. Commodo fringilla sed tempor risus laoreet ultrices ipsum. Habitasse morbi faucibus in iaculis lectus. Nisi enim feugiat enim volutpat. Sem quis viverra viverra odio mauris nunc.",
  },
  {
    id: "05",
    question:
      "Can I receive notifications for any future jobs that may interest me?",
    answer:
      "Nunc sed a nisl purus. Nibh dis faucibus proin lacus tristique. Sit congue non vitae odio sit erat in. Felis eu ultrices a sed massa. Commodo fringilla sed tempor risus laoreet ultrices ipsum. Habitasse morbi faucibus in iaculis lectus. Nisi enim feugiat enim volutpat. Sem quis viverra viverra odio mauris nunc.",
  },
];

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <section className="max-w-5xl mx-auto px-6 py-20 -mt-20">
      {/* Heading */}
      <div className="text-center mb-14">
        <h2 className="text-3xl md:text-4xl font-semibold text-black mb-3">
          Frequently Asked Questions
        </h2>
        <p className="text-gray-500 text-sm">
          At eu lobortis pretium tincidunt amet lacus ut aenean aliquet
        </p>
      </div>

      {/* FAQ List */}
      <div className="space-y-4">
        {faqs.map((faq, index) => {
          const isOpen = openIndex === index;

          return (
            <div
              key={index}
              className={`group rounded-xl border transition-all duration-300
                ${
                  isOpen
                    ? "bg-teal-50 border-teal-200 shadow-md"
                    : "bg-white hover:border-teal-300 hover:shadow-sm"
                }`}
            >
              {/* Question */}
              {/* Question */}
              <div
                className="flex items-center justify-between px-6 py-5 cursor-pointer"
                onClick={() => setOpenIndex(isOpen ? null : index)}
              >
                {/* Question text */}
                <div className="flex-1 flex gap-4 items-center min-w-0">
                  {/* Number */}
                  <span
                    className="text-teal-500 font-semibold transition-transform duration-300
                 group-hover:scale-110"
                  >
                    {faq.id}
                  </span>

                  {/* Question text */}
                  <h4
                    className={`text-black transition-all duration-300 break-words
        ${isOpen ? "font-bold" : "font-semibold group-hover:font-bold"}`}
                  >
                    {faq.question}
                  </h4>
                </div>

                {/* Icon (always fixed circle) */}
                <span
                  className={`w-8 h-8 flex-shrink-0 flex items-center justify-center rounded-full border transition-colors duration-300
      ${
        isOpen
          ? "border-teal-500 text-teal-500"
          : "border-teal-400 text-teal-400 group-hover:border-teal-500 group-hover:bg-teal-500 group-hover:text-white"
      }`}
                >
                  {isOpen ? <FaTimes size={12} /> : <FaPlus size={12} />}
                </span>
              </div>

              {/* Answer */}
              <div
                className={`overflow-hidden transition-all duration-300 ease-in-out
                  ${isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}`}
              >
                <div className="px-14 pb-6 text-gray-600 text-sm leading-relaxed">
                  {faq.answer}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default FAQSection;
