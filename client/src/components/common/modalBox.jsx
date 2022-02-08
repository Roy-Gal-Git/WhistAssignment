import React from "react";
import ProductEditForm from "../productEditForm";
import { Modal, Button } from "react-bootstrap";

const ModalBox = ({ show, onModal, onSubmit, currentEdit, label }) => {
  return (
    <Modal show={show} onHide={() => onModal()}>
      <Modal.Header closeButton>
        <Modal.Title>{label}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <ProductEditForm data={currentEdit} onSubmit={onSubmit} />
      </Modal.Body>
    </Modal>
  );
};

export default ModalBox;
