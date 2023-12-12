import {
  ActionIcon,
  Autocomplete,
  MultiSelect,
  Modal,
  Input,
  Button,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { IconNewSection } from "@tabler/icons-react";
import { useContext, useState } from "react";
import PotentialChat from "../components/chat/PotentialChat";
import UserChat from "../components/chat/UserChat";
import ChatBox from "../components/chat/chatbox";
import { AuthContext } from "../context/Authcontext";
import { GroupContext } from "../context/GroupContext";
import { useDisclosure } from "@mantine/hooks";
import CallVideo from "../components/CallVideo";
const Chat = () => {
  const { user } = useContext(AuthContext);
  const [opened, { open, close }] = useDisclosure(false);
  // const [value, setValue] = useState([]);
  const { allUser } = useContext(GroupContext);
  const transformedArray = allUser
    .filter((u) => user._id !== u._id) // Lọc ra các phần tử có user._id khác với u._id
    .map((u) => ({
      value: u._id,
      label: u.name,
    }));
  // console.log(value);
  const {
    userGroups,
    setUserGroups,
    isUserGroupLoading,
    userGroupError,
    updateCurrenChat,
    isSubmitting,
  } = useContext(GroupContext);
  const form = useForm({
    initialValues: {
      array: [],
      name: "",
    },
    validate: (values) => {
      const errors = {};

      if (values.array.length < 3) {
        errors.array = "Select at least 3 members";
      }

      if (!values.name.trim()) {
        errors.name = "Enter the group name";
      }

      return errors;
    },
  });
  const { createChat } = useContext(GroupContext);
  return (
    <div className="container-box">
      <div className="user-list-container">
        <div
          style={{
            display: "flex",
            marginTop: "10px",
            width: "100%",
            overflow: "auto",
          }}
        >
          <Autocomplete
            placeholder="Search"
            data={["React", "Angular", "Vue", "Svelte"]}
            style={{ width: "85%", textAlign: "center", marginLeft: "5px" }}
          />
          <ActionIcon
            variant="outline"
            style={{
              width: "15%",
              marginLeft: "10px",
              marginRight: "10px",
              marginTop: "2px",
            }}
            onClick={open}
          >
            <IconNewSection />
          </ActionIcon>
        </div>

        <div className="online-status">
          <PotentialChat />
        </div>

        <div className="users">
          {isUserGroupLoading && <p>Loading chat...</p>}
          {userGroups?.map((group, index) => {
            return (
              <div key={index} onClick={() => updateCurrenChat(group)}>
                <UserChat group={group} user={user} />
              </div>
            );
          })}
        </div>
      </div>

      <div className="chat-container">
        <ChatBox />
      </div>

      <Modal
        opened={opened}
        onClose={() => {
          form.setFieldValue("array", []);
          form.setFieldValue("name", "");
          close();
        }}
        size="lg"
        centered
        title="New group"
      >
        <form
          onSubmit={form.onSubmit(async () => {
            const res = await createChat(
              [...form.values.array, user],
              form.values.name
            );
            if (res) {
              form.setFieldValue("array", []);
              form.setFieldValue("name", "");
              close();
            }
          })}
          style={{ margin: "30px" }}
        >
          <MultiSelect
            // label="Create group"
            placeholder="Select group members"
            limit={40}
            data={transformedArray}
            searchable
            // value={value}
            value={form.values.array}
            error={form.errors.array}
            onChange={(selectedValue) =>
              form.setFieldValue("array", selectedValue)
            }
            style={{ margin: "10px 0 30px 0" }}
            maxDropdownHeight={100}
          />
          <Input
            radius="md"
            placeholder="Enter the group name"
            style={{ margin: "10px 0 10px 0" }}
            value={form.values.name}
            error={form.errors.name}
            onChange={(event) => form.setFieldValue("name", event.target.value)}
          />
          <Button type="submit" fullWidth mt="xl" disabled={isSubmitting}>
            Create
          </Button>
        </form>
      </Modal>
    </div>
  );
};
export default Chat;
