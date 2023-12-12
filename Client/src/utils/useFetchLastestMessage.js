import { useContext, useEffect, useState } from "react";
import { GroupContext } from "../context/GroupContext";
import { baseUrl, getRequest } from "./services";

const useFetchLastestMessage = (chat) => {
  const { newMessage, notification } = useContext(GroupContext);
  const [lastestMessage, setLastestMessage] = useState(null);
  useEffect(() => {
    const getMessage = async () => {
      const response = await getRequest(`${baseUrl}/message/${chat?._id}`);
      if (response.error) {
        return console.log("Error getting Message...", response);
      }
      const lastMessage = response[response?.length - 1];
      setLastestMessage(lastMessage);
    };
    getMessage();
  }, [newMessage, notification]);
  return { lastestMessage };
};

export default useFetchLastestMessage;
