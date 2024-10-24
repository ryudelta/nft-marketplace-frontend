
import React from "react";
import { Alert, Button, Modal } from "react-bootstrap";

interface ModalProps {
    title: string;
    message: string;
    isVisible: boolean;
    onClose: () => void;
}

const AlertModal: React.FC<ModalProps> = ({ title, message, isVisible, onClose }) => {
    return (
      <Modal show={isVisible} onHide={onClose}>
        <Modal.Header closeButton>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Alert variant="info">{message}</Alert>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    );
  };
  
  export default AlertModal;