import { useEffect, useState } from "react";
import { baseUrl, getRequest } from "../utils/services";

export const useFetchRecipient = (group, user) => {
  const [recipientUser, setRecipientUser] = useState(null);
  const [error, setError] = useState(null);

  const recipientId = group?.members?.find((id) => id !== user?._id);

  useEffect(() => {
    const getUser = async () => {
      if (!recipientId) return null;

      const response = await getRequest(`${baseUrl}/auth/find/${recipientId}`);

      if (response.error) {
        return setError(error);
      }
      setRecipientUser(response);
    };

    getUser();
  }, [recipientId]);
  return { recipientUser };
};
