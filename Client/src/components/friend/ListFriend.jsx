import { Divider, Table } from "@mantine/core";
import { useContext } from "react";
import { Container } from "react-bootstrap";
import { AuthContext } from "../../context/Authcontext";
import { FriendContext } from "../../context/FriendContext";
import { GroupContext } from "../../context/GroupContext";
import Friend from "./friend";
import ViewProfile from "../chat/ViewProfile";

export function ListFriend({}) {
  const { friends } = useContext(FriendContext);
  const { allUser } = useContext(GroupContext);
  const { user } = useContext(AuthContext);
  const users = allUser?.filter((user) => friends?.includes(user._id));
  const notFriends = allUser?.filter((u) => {
    if (!friends?.includes(u._id) && u._id !== user?._id) return true;
  });
  return (
    <>
      <ViewProfile />
      <Container>
        {friends?.length > 1 ? (
          <Divider
            my="xs"
            size={10}
            label="Your Friends"
            labelPosition="center"
          />
        ) : (
          ""
        )}
        {friends?.length > 1 ? (
          <Table.ScrollContainer minWidth={800}>
            <Table verticalSpacing="sm">
              <Table.Thead>
                <Table.Tr>
                  <Table.Th>Name</Table.Th>
                  <Table.Th>Online</Table.Th>
                  <Table.Th>Email</Table.Th>
                  <Table.Th>Phone</Table.Th>
                  <Table.Th />
                </Table.Tr>
              </Table.Thead>
              <Table.Tbody>
                {users?.map((u, index) => {
                  return <Friend user={u} isfriend={true} key={index} />;
                })}
              </Table.Tbody>
            </Table>
          </Table.ScrollContainer>
        ) : (
          ""
        )}
        <Divider
          my="xs"
          size={10}
          label="People you may know?"
          labelPosition="center"
        />
        {notFriends?.length > 1 ? (
          <Table.ScrollContainer minWidth={800}>
            <Table verticalSpacing="sm">
              <Table.Thead>
                <Table.Tr>
                  <Table.Th>Name</Table.Th>
                  <Table.Th>Online</Table.Th>
                  <Table.Th>Email</Table.Th>
                  <Table.Th>Phone</Table.Th>
                  <Table.Th />
                </Table.Tr>
              </Table.Thead>
              <Table.Tbody>
                {notFriends?.map((u, index) => {
                  return <Friend user={u} isfriend={false} key={index} />;
                })}
              </Table.Tbody>
            </Table>
          </Table.ScrollContainer>
        ) : (
          ""
        )}
      </Container>
    </>
  );
}
