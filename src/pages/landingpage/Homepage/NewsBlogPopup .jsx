import React from "react";

const NewsBlogPopup = ({ onClose }) => {
  return (
    <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center px-4">
      {/* Modal */}
      <div className="bg-white max-w-3xl w-full rounded-2xl overflow-hidden animate-[scaleUp_0.35s_ease-out] shadow-2xl">
        {/* IMAGE */}
        <div className="h-64 w-full overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f"
            alt="news"
            className="w-full h-full object-cover"
          />
        </div>

        {/* CONTENT */}
        <div className="p-8">
          {/* TITLE */}
          <h2 className="text-3xl font-bold text-black mb-2">
            How Modern Web Design is Changing User Experience
          </h2>

          {/* SUB TEXT */}
          <p className="text-[#309689] font-medium mb-4">
            Design trends, UX improvements and performance tips
          </p>

          {/* DATE */}
          <p className="text-sm text-gray-400 mb-6">
            Published on · 12 Feb 2026
          </p>

          {/* DESCRIPTION */}
          <p className="text-gray-700 leading-relaxed text-base">
            Modern web design focuses on simplicity, accessibility and
            performance. With the rise of responsive layouts and interactive
            elements, users expect fast, clean and engaging experiences.
            Designers today prioritize usability while maintaining strong visual
            identity.
            <br />
            <br />
            From subtle animations to clear typography and color balance, every
            detail matters. A thoughtful design not only attracts users but also
            builds trust and credibility for the brand.
          </p>

          {/* ACTION */}
          <div className="mt-8 flex justify-end">
            <button
              onClick={onClose}
              className="px-6 py-2 rounded-full border border-black text-black hover:bg-[#309689] hover:text-white transition"
            >
              Close
            </button>
          </div>
        </div>
      </div>

      {/* BACKDROP CLICK */}
      <div className="absolute inset-0" onClick={onClose} />
    </div>
  );
};

export default NewsBlogPopup;
