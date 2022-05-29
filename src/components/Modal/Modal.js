import React from "react";
import Modal from "react-modal";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    zIndex: 1000,
    height: "75vh",
  },
};

Modal.setAppElement("#root");

function ReactModal({ isOpen, setIsOpen, children }) {
  function closeModal() {
    setIsOpen(false);
  }

  return (
    <div>
      <Modal
        isOpen={isOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        {children}
      </Modal>
    </div>
  );
}

export default ReactModal;
