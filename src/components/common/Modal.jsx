import { ImCross } from "react-icons/im";

const Modal = ({ title, children, onClose,maxHieght = "max-h-[85vh]",  maxWidth = "max-w-2xl" }) => (
  <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-4">
    <div
      className={`
        bg-white rounded-xl w-full ${maxWidth}
        ${maxHieght} flex flex-col
        overflow-hidden
      `}
    >
      {/* HEADER */}
      <div className="p-4 border-b flex justify-between items-center shrink-0">
        <h3 className="font-semibold text-gray-800">{title || ""}</h3>
        <button onClick={onClose}>
          <ImCross
            size={14}
            className="cursor-pointer text-red-400 hover:text-red-600"
          />
        </button>
      </div>

      {/* BODY */}
      <div
        className="
          p-6 overflow-y-auto overflow-x-auto
          break-words
        "
      >
        {children}
      </div>
    </div>
  </div>
);

export default Modal;
