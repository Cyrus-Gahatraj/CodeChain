import React, { useRef } from "react";
import { X } from "lucide-react";

function Modal({ onClose, children }) {
  const modalRef = useRef(null);

  const handleBackgroundClick = (event) => {
    if (modalRef.current && event.target === modalRef.current) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black/50 flex justify-center items-center z-[9999] p-4"
      onClick={handleBackgroundClick}
      ref={modalRef}
    >
      <div className="relative bg-[#252422] flex flex-col w-full max-w-[90vw] sm:max-w-[80vw] md:max-w-[70vw] lg:max-w-[55vw] h-[80vh] max-h-[90vh] rounded-lg shadow-lg p-6">
        <button
          onClick={onClose}
          className="absolute -top-[14px] -right-[15px] z-50 flex items-center justify-center size-9 bg-[#ff595e]  hover:bg-[#ff6b6b] rounded-full transition-colors shadow-md"
          aria-label="Close modal"
        >
          <X className="size-6 text-white" />
        </button>

        <div className="flex flex-col gap-3">{children}</div>
      </div>
    </div>
  );
}

export default Modal;
