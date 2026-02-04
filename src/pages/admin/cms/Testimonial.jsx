import React, { useState } from "react";
import { FaStar, FaEdit, FaTrash } from "react-icons/fa";
import Modal from "../../../components/common/Modal";
import TestimonialForm from "./TestimonialForm";

import {
  useGetAllTestimonialsQuery,
  useDeleteTestimonialMutation,
} from "../../../services/endpoints/testimonialApi";

const Testinomial = () => {
  const [openModal, setOpenModal] = useState(false);
  const [selectedData, setSelectedData] = useState(null);

  const {
    data: testimonials = [],
    isLoading,
    refetch,
  } = useGetAllTestimonialsQuery();

  const [deleteTestimonial] = useDeleteTestimonialMutation();

  const handleDelete = async (id) => {
    if (window.confirm("Delete this testimonial?")) {
      await deleteTestimonial(id).unwrap();
      refetch(); // ✅ refresh list
    }
  };

  return (
    <div className="p-6 bg-white rounded-xl shadow mt-5">
      {/* HEADER */}
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-semibold">Testimonials</h2>
        <button
          onClick={() => {
            setSelectedData(null);
            setOpenModal(true);
          }}
          className="px-4 py-2 btn-primary  text-white rounded-lg "
        >
          + Add Testimonial
        </button>
      </div>

      {isLoading && <p>Loading...</p>}

      {/* CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {testimonials.map((item) => (
          <div
            key={item._id}
            className="relative group bg-[#f9fafb] rounded-2xl p-6 shadow hover:shadow-xl transition-all"
          >
            {/* ACTION BUTTONS */}
            <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition flex gap-3">
              <button
                onClick={() => {
                  setSelectedData(item);
                  setOpenModal(true);
                }}
                className="text-blue-600"
              >
                <FaEdit />
              </button>
              <button
                onClick={() => handleDelete(item._id)}
                className="text-red-600"
              >
                <FaTrash />
              </button>
            </div>

            {/* STARS */}
            <div className="flex gap-1 mb-4">
              {[...Array(5)].map((_, i) => (
                <FaStar
                  key={i}
                  className={
                    i < item.rating ? "text-yellow-400" : "text-gray-300"
                  }
                />
              ))}
            </div>

            {/* CONTENT */}
            <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
            <p className="text-sm text-gray-600 mb-6">{item.description}</p>

            {/* FOOTER */}
            <div className="flex items-center gap-3">
              <img
                src={item.avatar}
                alt={item.name}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div>
                <h4 className="text-sm font-semibold">{item.name}</h4>
                <p className="text-xs text-gray-400">{item.subText}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* MODAL */}
      {openModal && (
        <Modal
          title={selectedData ? "Edit Testimonial" : "Create Testimonial"}
          onClose={() => setOpenModal(false)}
        >
          <TestimonialForm
            mode={selectedData ? "edit" : "create"} // ✅ FIX
            selectedData={selectedData} // ✅ FIX
            onClose={() => {
              setOpenModal(false);
              setSelectedData(null);
              refetch(); // ✅ refresh after save
            }}
          />
        </Modal>
      )}
    </div>
  );
};

export default Testinomial;
