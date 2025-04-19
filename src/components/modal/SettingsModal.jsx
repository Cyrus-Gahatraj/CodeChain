import React from "react";
import Modal from "./Modal";

function SettingsModal({ onClose }) {
  return (
    <Modal onClose={onClose}>
      <h1 className="text-white text-xl font-bold">Hello World!</h1>
      <p className="text-white">This is a modal.</p>
    </Modal>
  );
}

export default SettingsModal;
