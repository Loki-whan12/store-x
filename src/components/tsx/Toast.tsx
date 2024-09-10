import { useState } from "react";
import Toast from "react-bootstrap/Toast";
import ToastContainer from "react-bootstrap/ToastContainer";

interface Props {
  title: string;
  message: string;
}

function ToastComponent({ title, message }: Props) {
  const [show, setShow] = useState(true);

  return (
    <ToastContainer position="bottom-end" className="p-3">
      <Toast onClose={() => setShow(false)} show={show} delay={5000} autohide>
        <Toast.Header>
          <strong className="me-auto">{title}</strong>
        </Toast.Header>
        <Toast.Body>{message}</Toast.Body>
      </Toast>
    </ToastContainer>
  );
}

export default ToastComponent;
