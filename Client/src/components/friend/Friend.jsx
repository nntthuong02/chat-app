import {
  ActionIcon,
  Anchor,
  Avatar,
  Badge,
  Group,
  Table,
  Text,
  rem,
} from "@mantine/core";
import moment from "moment";
import {
  IconMessage2Share,
  IconPhoneCall,
  IconUserPlus,
} from "@tabler/icons-react";
import { useContext } from "react";
import { GroupContext } from "../../context/GroupContext";
import { FriendContext } from "../../context/FriendContext";
import { AuthContext } from "../../context/Authcontext";
import { useNavigate } from "react-router-dom";
import { CallContext } from "../../context/CallContext";
const Friend = ({ user: use, isfriend }) => {
  const navigate = useNavigate();
  const { onlineUsers, createChat } = useContext(GroupContext);
  const { updateViewProfile, updateUserView } = useContext(FriendContext);
  const isOnline = onlineUsers.some((u) => u?.userId === use?._id);
  const { user } = useContext(AuthContext);
  const { callUser } = useContext(CallContext);
  return (
    <>
      <Table.Tr key={use.name} className="TableRow">
        <Table.Td>
          <Group gap="sm">
            <Avatar
              size={30}
              src={use.avatar}
              radius={30}
              onClick={() => {
                updateViewProfile();
                updateUserView(use);
              }}
            />
            <Text fz="sm" fw={500}>
              {use.name}
            </Text>
          </Group>
        </Table.Td>

        <Table.Td>
          <Badge variant="light" color={isOnline ? "green" : "red"}>
            {!isOnline ? moment(use.updatedAt).fromNow() : "Online"}
          </Badge>
        </Table.Td>
        <Table.Td>
          <Anchor component="button" size="sm">
            {use.email}
          </Anchor>
        </Table.Td>
        <Table.Td>
          <Text fz="sm">+84 {use.numberPhone}</Text>
        </Table.Td>
        <Table.Td>
          <Group gap={10} justify="flex-end">
            {!isfriend && (
              <ActionIcon variant="subtle" color="red">
                <IconUserPlus
                  style={{ width: "35px", height: "35px" }}
                  stroke={1.5}
                />
              </ActionIcon>
            )}
            <ActionIcon variant="subtle" color="green">
              <IconPhoneCall
                style={{ width: "35px", height: "35px" }}
                stroke={1.5}
                onClick={() => {
                  callUser({ recipientUser: use, user });
                }}
              />
            </ActionIcon>
            <ActionIcon variant="subtle" color="blue">
              <IconMessage2Share
                style={{ width: "35px", height: "35px" }}
                stroke={1.5}
                onClick={() => {
                  createChat([user._id, use._id]);
                  navigate("/message");
                }}
              />
            </ActionIcon>
          </Group>
        </Table.Td>
      </Table.Tr>
    </>
  );
};

export default Friend;
