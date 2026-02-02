import React from "react";

const CandidateProfile = () => {
  return (
    <div className="min-h-screen bg-[#f4f6f8] flex justify-center items-center px-4 py-16">
      {/* CARD */}
      <div className="w-full max-w-5xl bg-[#fffdf7] rounded-3xl p-12 shadow-2xl">
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="text-3xl font-bold text-[#309689] mb-3">
            Please Fill Your Details
          </h1>
          <p className="text-gray-600 text-base">
            Complete your profile to get better job opportunities
          </p>
        </div>

        {/* Form */}
        <form className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <input type="text" placeholder="Full Name" className="input-xl" />
          <input
            type="email"
            placeholder="Email Address"
            className="input-xl"
          />

          <input type="text" placeholder="Phone Number" className="input-xl" />
          <input
            type="text"
            placeholder="Current Location"
            className="input-xl"
          />

          <input type="text" placeholder="Current Role" className="input-xl" />
          <input
            type="text"
            placeholder="Experience (e.g. 2 Years)"
            className="input-xl"
          />

          <input
            type="text"
            placeholder="Expected Salary"
            className="input-xl"
          />
          <input
            type="text"
            placeholder="Preferred Job Location"
            className="input-xl"
          />

          <input
            type="text"
            placeholder="Skills (React, Node, MongoDB)"
            className="input-xl md:col-span-2"
          />

          <input
            type="text"
            placeholder="Resume URL"
            className="input-xl md:col-span-2"
          />

          <input
            type="text"
            placeholder="LinkedIn Profile URL"
            className="input-xl md:col-span-2"
          />

          <input
            type="text"
            placeholder="Portfolio / GitHub URL"
            className="input-xl md:col-span-2"
          />

          <textarea
            rows="5"
            placeholder="About Yourself"
            className="input-xl md:col-span-2 resize-none"
          />

          {/* Button */}
          <div className="md:col-span-2 flex justify-center mt-10">
            <button
              type="button"
              className="
                px-14 py-4
                bg-[#309689]
                text-white
                text-lg
                font-semibold
                rounded-xl
                shadow-lg
                hover:bg-black
                hover:scale-105
                transition-all
                duration-300
              "
            >
              Save Details
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CandidateProfile;
