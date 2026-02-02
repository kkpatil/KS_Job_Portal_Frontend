const Modal = ({ children, onClose }) => (
  <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
    <div className="bg-white rounded-xl w-full max-w-2xl max-h-[85vh] flex flex-col">
      
      {/* HEADER (optional) */}
      <div className="p-4 border-b flex justify-between items-center">
        <h3 className="font-semibold">CMS Form</h3>
        <button onClick={onClose}>✕</button>
      </div>

      {/* BODY (SCROLL HERE) */}
      <div className="p-6 overflow-y-auto">
        {children}
      </div>
    </div>
  </div>
);

export default Modal;