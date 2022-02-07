import React from "react";

import { Modal, Button } from "react-bootstrap";

const ModalBox = ({ show, onModal }) => {
  return (
    <Modal show={show} onHide={() => onModal()}>
      <Modal.Header closeButton>
        <Modal.Title>Modal heading</Modal.Title>
      </Modal.Header>
      <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => onModal()}>
          Close
        </Button>
        <Button variant="primary" onClick={() => onModal()}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalBox;
