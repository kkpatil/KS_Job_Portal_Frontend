import React, { useState } from "react";
import { FaPlus, FaTimes } from "react-icons/fa";
import DOMPurify from "dompurify";

const FAQSection = ({ cms }) => {
  const section = cms?.["about.faq"];
  const [openIndex, setOpenIndex] = useState(null);

  if (!section) return null;

  const { heading, description, faqs = [] } = section;

  return (
    <section className="max-w-5xl mx-auto px-6 py-20 -mt-20">
      {/* Heading */}
      <div className="text-center mb-14">
        <div
          className="text-3xl md:text-4xl font-semibold text-black mb-3"
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(heading || ""),
          }}
        />

        <div
          className="text-gray-500 text-sm"
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(description || ""),
          }}
        />
      </div>

      {/* FAQ List */}
      <div className="space-y-4">
        {faqs.map((faq, index) => {
          const isOpen = openIndex === index;

          return (
            <div
              key={index}
              className={`rounded-xl border transition-all duration-300
                ${
                  isOpen
                    ? "bg-teal-50 border-teal-200 shadow-md"
                    : "bg-white hover:border-teal-300 hover:shadow-sm"
                }`}
            >
              {/* Question */}
              <button
                type="button"
                className="w-full flex items-center justify-between px-6 py-5 text-left"
                onClick={() =>
                  setOpenIndex(isOpen ? null : index)
                }
              >
                <div className="flex gap-4 items-center">
                  <span className="text-teal-500 font-semibold">
                    {faq.id}
                  </span>

                  <h4 className="font-semibold text-black">
                    {faq.question}
                  </h4>
                </div>

                {/* Icon with rotation */}
                <span
                  className={`w-8 h-8 flex items-center justify-center rounded-full border
                    transition-transform duration-300
                    ${
                      isOpen
                        ? "border-teal-500 text-teal-500 rotate-180"
                        : "border-teal-400 text-teal-400"
                    }`}
                >
                  {isOpen ? <FaTimes size={12} /> : <FaPlus size={12} />}
                </span>
              </button>

              {/* Answer (SMOOTH AF) */}
              <div
                className={`grid transition-all duration-300 ease-in-out
                  ${
                    isOpen
                      ? "grid-rows-[1fr] opacity-100"
                      : "grid-rows-[0fr] opacity-0"
                  }`}
              >
                <div className="overflow-hidden">
                  <div
                    className="px-14 pb-6 text-gray-600 text-sm"
                    dangerouslySetInnerHTML={{
                      __html: DOMPurify.sanitize(
                        faq.answer || ""
                      ),
                    }}
                  />
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
