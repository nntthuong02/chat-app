import { createContext, useCallback, useEffect, useState } from "react";

import { baseUrl, getRequest, postRequest } from "../utils/services";
export const GroupContext = createContext();

export const GroupContextProvider = ({ children, user, socket }) => {
  const [userGroups, setUserGroups] = useState(null);
  const [isUserGroupLoading, setIsUserGroupLoading] = useState(false);
  const [userGroupError, setUserGroupError] = useState(null);
  const [potentialChats, setPotentialChats] = useState([]);
  const [currenChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState(null);
  const [isMessagesLoading, setIsMessagesLoading] = useState(false);
  const [messagesError, setMessagesError] = useState(null);
  const [sendTextMessageError, setSendTextMessageError] = useState(null);
  const [newMessage, setNewMessage] = useState(null);

  const [onlineUsers, setOnlineUsers] = useState([]);
  const [notification, setNotification] = useState([]);
  const [allUser, setAllUser] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [newChatBox, setNewChatBox] = useState(null);

  //add online user
  useEffect(() => {
    if (socket === null) return;
    socket.emit("addNewUser", user?._id);

    socket.on("getonlineUsers", (res) => {
      setOnlineUsers(res);
    });
  }, [socket]);

  //send message
  useEffect(() => {
    if (socket === null) return;
    let recipientId;
    let members = currenChat.members;
    if (currenChat.userCount > 2) {
      socket.emit("sendMessageBox", { newMessage, members });
    } else {
      recipientId = currenChat?.members?.find((id) => id !== user?._id);
      socket.emit("sendMessage", { ...newMessage, recipientId });
    }
  }, [newMessage]);

  //get message
  useEffect(() => {
    if (socket === null) return;

    socket.on("getMessage", (res) => {
      if (currenChat?._id !== res.group_id) return;
      setMessages((pre) => [...pre, res]);
    });
    socket.on("getNotification", (res) => {
      let isChatOpen;
      if (currenChat?._id === res.group_id) {
        isChatOpen = true;
      }
      if (isChatOpen) {
        setNotification((prev) => [{ ...res, isRead: true }, ...prev]);
      } else {
        setNotification((prev) => [res, ...prev]);
      }
    });
    socket.on("newBoxChat", (res) => {
      console.log(res);
      setUserGroups((pre) => [...pre, res]);
    });

    return () => {
      socket.off("newBoxChat");
      socket.off("getMessage");
      socket.off("getNotification");
    };
  }, [socket, currenChat]);

  useEffect(() => {
    const getUsers = async () => {
      const response = await getRequest(`${baseUrl}/auth`);

      if (response.error) {
        return console.log("Error Fetching User", response);
      }

      const pChats = response.filter((u) => {
        if (user === null) {
          return false; // Không thêm vào pChats nếu user là null
        }
        let isChatCreated = false;
        if (user?._id === u._id) return false;
        return !isChatCreated;
      });
      setPotentialChats(pChats);
      setAllUser(response);
    };
    getUsers();
  }, [userGroups, onlineUsers]);

  const sendTextMessage = useCallback(
    async (textMessage, sender, currentChatId, setTextMessage) => {
      if (!textMessage) return console.log("Tin nhắn trống");
      const response = await postRequest(
        `${baseUrl}/message`,
        JSON.stringify({
          text: textMessage,
          user_id: sender._id,
          group_id: currentChatId,
        })
      );
      if (response.error) {
        return setSendTextMessageError(response);
      }

      setNewMessage(response);
      setNotification((prev) => [{ ...response, isRead: true }, ...prev]);
      setMessages((pre) => [...pre, response]);
      setTextMessage("");
    },
    []
  );

  const updateCurrenChat = useCallback((chat) => {
    setCurrentChat(chat);
  }, []);
  //Xử lí thông báo
  const markAllNotification = useCallback((notification) => {
    const mNotification = notification.map((n) => {
      return { ...n, isRead: true };
    });
    setNotification(mNotification);
  });
  const markNotificationAsRead = useCallback(
    (n, userGroups, user, notification) => {
      //find to open chat
      const desiredChat = userGroups.find((chat) => {
        const chatMembers = [user._id, n.user_id];
        const isDesiredChat = chat?.members.every((member) => {
          return chatMembers.includes(member);
        });
        return isDesiredChat;
      });
      //mark notification as read
      const mNotification = notification.map((el) => {
        if (n.user_id === el.user_id) {
          return {
            ...n,
            isRead: true,
          };
        } else {
          return el;
        }
      });
      updateCurrenChat(desiredChat);
      setNotification(mNotification);
    },
    []
  );
  const markThisUserNotificationAsRead = useCallback(
    (thisUserNotification, notification) => {
      //mark notification as read

      const mNotification = notification.map((el) => {
        let notify;
        thisUserNotification.forEach((n) => {
          if (n.group_id === el.group_id) {
            notify = { ...n, isRead: true };
          } else {
            notify = el;
          }
        });

        return notify;
      });
      setNotification(mNotification);
    },
    []
  );
  useEffect(() => {
    if (socket === null) return;

    socket.emit("createChat", { newChatBox, user });
  }, [newChatBox]);

  const createChat = useCallback(async (members, nameGroup) => {
    setIsSubmitting(true);
    const response = await postRequest(
      `${baseUrl}/group/`,
      JSON.stringify({
        members,
        name: nameGroup,
      })
    );

    if (response.id) {
      setCurrentChat(response.id);
      return;
    }

    setNewChatBox(response);
    setCurrentChat(response);
    setIsSubmitting(false);
    if (response.error) {
      return "";
    }
    setUserGroups((pre) => [...pre, response]);
    return response;
  }, []);
  useEffect(() => {
    const getUserGroups = async () => {
      setIsUserGroupLoading(true);

      if (user?._id) {
        const response = await getRequest(`${baseUrl}/group/${user?._id}`);
        setIsUserGroupLoading(false);
        if (response.error) {
          return setUserGroupError(response);
        }
        setUserGroups(response);
      }
    };
    getUserGroups();
  }, [user]);
  useEffect(() => {
    const getMessages = async () => {
      setIsMessagesLoading(true);
      if (currenChat != null) {
        const response = await getRequest(
          `${baseUrl}/message/${currenChat?._id}`
        );
        setIsMessagesLoading(false);
        if (response.error) {
          return setMessagesError(response);
        }
        setMessages(response);
      }
    };
    getMessages();
  }, [currenChat]);
  return (
    <GroupContext.Provider
      value={{
        userGroups,
        setUserGroups,
        isUserGroupLoading,
        userGroupError,
        potentialChats,
        updateCurrenChat,
        messages,
        isMessagesLoading,
        messagesError,
        currenChat,
        sendTextMessage,
        setSendTextMessageError,
        onlineUsers,
        notification,
        allUser,
        markAllNotification,
        markNotificationAsRead,
        markThisUserNotificationAsRead,
        createChat,
        isSubmitting,
        socket,
      }}
    >
      {children}
    </GroupContext.Provider>
  );
};
