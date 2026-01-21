import { ImCross } from "react-icons/im";

const Modal = ({ children, onClose }) => (
  <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
    <div className="bg-white rounded-xl p-6 w-full max-w-md relative">
      <button
        onClick={onClose}
        className="absolute top-3 right-4 text-gray-400 cursor-pointer"
      >
        <ImCross size={16} />
      </button>
      {children}
    </div>
  </div>
);

export default Modal;