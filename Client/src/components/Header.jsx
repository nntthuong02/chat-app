import { useContext, useState } from "react";
import { AuthContext } from "../context/Authcontext";
import ".././index.css";
import Notification from "./chat/Notification";
import cx from "clsx";
import { useNavigate } from "react-router-dom";

import {
  Container,
  Avatar,
  UnstyledButton,
  Group,
  Text,
  Menu,
  Tabs,
  Burger,
  rem,
  useMantineTheme,
  Button,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import {
  IconLogout,
  IconSettings,
  IconChevronDown,
  IconUserPlus,
  IconUserCircle,
} from "@tabler/icons-react";

import classes from "./HeaderTabs.module.css";
import React from "react";
import { useLocation } from "react-router-dom";

const tabs = ["Message", "Friend", "Profile"];
function Header() {
  const location = useLocation();
  const hideHeader = location.pathname === "/call";
  const theme = useMantineTheme();
  const [opened, { toggle }] = useDisclosure(false);
  const [activeTab, setActiveTab] = useState("Message");
  const [userMenuOpened, setUserMenuOpened] = useState(false);
  const navigate = useNavigate();
  if (hideHeader) {
    return null; // Trả về null nếu bạn muốn ẩn header
  }
  const items = tabs.map((tab) => (
    <Tabs.Tab value={tab} key={tab}>
      {tab}
    </Tabs.Tab>
  ));
  const { user, logOutUser } = useContext(AuthContext);

  return (
    <div className={classes.header}>
      <Container className={classes.mainSection} size="md">
        <Group justify="space-between">
          <Burger
            opened={opened}
            onClick={toggle}
            hiddenFrom="xs"
            size="sm"
            className="bg-primay"
          />
          <strong style={{ color: "blue" }}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              fill="currentColor"
              className="bi bi-chat-heart"
              viewBox="0 0 16 16"
            >
              <path d="M2.965 12.695a1 1 0 0 0-.287-.801C1.618 10.83 1 9.468 1 8c0-3.192 3.004-6 7-6s7 2.808 7 6c0 3.193-3.004 6-7 6a8.06 8.06 0 0 1-2.088-.272 1 1 0 0 0-.711.074c-.387.196-1.24.57-2.634.893a10.97 10.97 0 0 0 .398-2m-.8 3.108.02-.004c1.83-.363 2.948-.842 3.468-1.105A9.06 9.06 0 0 0 8 15c4.418 0 8-3.134 8-7s-3.582-7-8-7-8 3.134-8 7c0 1.76.743 3.37 1.97 4.6a10.437 10.437 0 0 1-.524 2.318l-.003.011a10.722 10.722 0 0 1-.244.637c-.079.186.074.394.273.362a21.673 21.673 0 0 0 .693-.125ZM8 5.993c1.664-1.711 5.825 1.283 0 5.132-5.825-3.85-1.664-6.843 0-5.132" />
            </svg>
            MESSENGER
          </strong>

          {user ? (
            <Group justify="flex-end">
              <Notification />
              <Menu
                width={260}
                position="bottom-end"
                transitionProps={{ transition: "pop-top-right" }}
                onClose={() => setUserMenuOpened(false)}
                onOpen={() => setUserMenuOpened(true)}
                withinPortal
              >
                <Menu.Target>
                  <UnstyledButton
                    className={cx(classes.user, {
                      [classes.userActive]: userMenuOpened,
                    })}
                  >
                    <Group gap={7}>
                      <Avatar
                        src={user?.avatar}
                        alt={user?.name}
                        radius="xl"
                        size={20}
                      />
                      <Text fw={500} size="sm" lh={1} mr={3}>
                        {user?.name}
                      </Text>
                      <IconChevronDown
                        style={{ width: rem(12), height: rem(12) }}
                        stroke={1.5}
                      />
                    </Group>
                  </UnstyledButton>
                </Menu.Target>

                <Menu.Dropdown>
                  <Menu.Item
                    leftSection={
                      <IconUserCircle
                        style={{ width: rem(16), height: rem(16) }}
                        color={theme.colors.red[6]}
                        stroke={1.5}
                      />
                    }
                    onClick={() => {
                      navigate("/profile");
                      setActiveTab("Profile");
                    }}
                  >
                    Profile
                  </Menu.Item>

                  <Menu.Label>Settings</Menu.Label>
                  {/* <Menu.Item
                    leftSection={
                      <IconSettings
                        style={{ width: rem(16), height: rem(16) }}
                        stroke={1.5}
                      />
                    }
                    onClick={() => {
                      navigate("/setting");
                      setActiveTab("Setting");
                    }}
                  >
                    Setting
                  </Menu.Item> */}
                  <Menu.Item
                    leftSection={
                      <IconLogout
                        style={{ width: rem(16), height: rem(16) }}
                        stroke={1.5}
                      />
                    }
                    onClick={logOutUser}
                  >
                    Logout
                  </Menu.Item>

                  <Menu.Divider />
                </Menu.Dropdown>
              </Menu>
            </Group>
          ) : (
            <Group>
              <Button
                leftSection={
                  <IconLogout
                    style={{ width: rem(16), height: rem(16) }}
                    stroke={1.5}
                  />
                }
                variant="gradient"
                gradient={{ from: "red", to: "blue", deg: 112 }}
              >
                Login
              </Button>

              <Button
                leftSection={
                  <IconUserPlus
                    style={{ width: rem(16), height: rem(16) }}
                    stroke={1.5}
                  />
                }
                variant="gradient"
                gradient={{ from: "red", to: "blue", deg: 112 }}
              >
                Register
              </Button>
            </Group>
          )}
        </Group>
      </Container>
      {user && (
        <Container size="md">
          <Tabs
            defaultValue={activeTab}
            variant="outline"
            visibleFrom="sm"
            classNames={{
              root: classes.tabs,
              list: classes.tabsList,
              tab: classes.tab,
            }}
            onChange={(value) => {
              if (value === "Setting") {
                setActiveTab(null);
              } else {
                setActiveTab(value);
                navigate(`/${value}`);
              }
            }}
          >
            <Tabs.List>{items}</Tabs.List>
          </Tabs>
        </Container>
      )}
    </div>
  );
}

export default Header;
