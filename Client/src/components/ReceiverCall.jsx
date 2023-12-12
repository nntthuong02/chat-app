import { useContext } from "react";
import { Button } from "react-bootstrap"; // Thêm import này
import Modal from "react-bootstrap/Modal";
import { CallContext } from "../context/CallContext";

const ReceiverCall = () => {
  const { receivingCall, rejectCall, acceptCall } = useContext(CallContext);

  if (!receivingCall) return null;
  return (
    <>
      <Modal
        show={true}
        onHide={rejectCall}
        backdrop="static"
        centered
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Có cuộc gọi mới</Modal.Title>
        </Modal.Header>

        <Modal.Footer>
          <Button
            variant="primary"
            onClick={() => {
              acceptCall();
            }}
          >
            Accepect
          </Button>
          <Button variant="d" onClick={rejectCall}>
            Reject
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ReceiverCall;
