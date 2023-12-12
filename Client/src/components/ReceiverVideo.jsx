// ToCalled.jsx
import Modal from "react-bootstrap/Modal";
import { IconMicrophone, IconPhoneCall, IconVideo } from "@tabler/icons-react";
import { useContext, useEffect, useRef, useState } from "react";
import { GroupContext } from "../context/GroupContext";

import { CloseButton, Group } from "@mantine/core";
import { CallContext } from "../context/CallContext";

const ReceiverVideo = () => {
  const { calling, endCalled, userVideo } = useContext(CallContext);

  if (!calling) return null;

  return (
    <Modal show={true} backdrop="static" keyboard={false}>
      <CloseButton
        className="justify-end"
        onClick={() => {
          endCalled();
        }}
      />

      <video
        ref={userVideo}
        playsInline
        autoPlay
        style={{ width: "100%", height: "80vh", objectFit: "contain" }}
        muted
      ></video>
      <Group justify="center">
        <IconVideo
          variant="secondary"
          style={{ width: "30px", height: "30px", margin: "12px" }}
          color="black"
        ></IconVideo>
        <IconPhoneCall
          style={{ width: "30px", height: "30px", margin: "12px" }}
          color="black"
        ></IconPhoneCall>
        <IconMicrophone
          variant="secondary"
          style={{ width: "30px", height: "30px", margin: "12px" }}
          color="black"
        ></IconMicrophone>
      </Group>
    </Modal>
  );
};

export default ReceiverVideo;
