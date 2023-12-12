import { useContext, useState } from "react";
import {
  IconMessage2Share,
  IconPhoneCall,
  IconUserPlus,
} from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";
import Modal from "react-bootstrap/Modal";
import { FriendContext } from "../../context/FriendContext";
import { Avatar, Text, Group, Paper, ActionIcon, Button } from "@mantine/core";
import { GroupContext } from "../../context/GroupContext";
import { AuthContext } from "../../context/Authcontext";
import { CallContext } from "../../context/CallContext";
function ViewProfile() {
  const { viewProfile, updateViewProfile, userView, updateUserView } =
    useContext(FriendContext);
  const { createChat, onlineUsers } = useContext(GroupContext);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const { callUser } = useContext(CallContext);
  if (!viewProfile) return null;
  if (!userView) return null;
  return (
    <>
      <Modal
        show={true}
        onHide={updateViewProfile}
        backdrop="static"
        keyboard={false}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Profile</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Paper radius="md" withBorder p="lg" bg="var(--mantine-color-body)">
            <Avatar src={userView.avatar} size={120} radius={120} mx="auto" />
            <Text ta="center" fz="lg" fw={500} mt="md">
              {userView.name}
            </Text>
            <Text ta="center" c="dimmed" fz="sm">
              {userView.email} • +84 {userView.numberPhone}
            </Text>
            <Group
              justify="center"
              gap={30}
              style={{ margin: "20px 0px 20px 0px" }}
            >
              <IconMessage2Share
                style={{ width: "30px", height: "30px" }}
                color="green"
                stroke={1.5}
                onClick={() => {
                  updateViewProfile();
                  createChat([user._id, userView._id]);
                  navigate("/message");
                }}
              />
              <ActionIcon variant="subtle" color="green">
                <IconPhoneCall
                  style={{ width: "30px", height: "30px" }}
                  stroke={1.5}
                  color="red"
                  onClick={() => {
                    callUser({ recipientUser: userView, user });
                  }}
                />
              </ActionIcon>
            </Group>
            <Group justify="center" style={{ margin: "20px 0px 20px 0px" }}>
              <Text>Address: {userView.address} </Text>
            </Group>
          </Paper>
        </Modal.Body>
        <Modal.Footer>
          <Group justify="center">
            <Button>Close</Button>
          </Group>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ViewProfile;
