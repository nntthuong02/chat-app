import { useContext, useState } from "react";
import { AuthContext } from "../../context/Authcontext";
import { GroupContext } from "../../context/GroupContext";
import { unreadNotificationsFunc } from "../../utils/unreadNotifications";
import moment from "moment";
import { Notification } from "@mantine/core";
import { IconBell } from "@tabler/icons-react";
const Notifications = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useContext(AuthContext);
  const {
    notification,
    userGroups,
    allUser,
    markAllNotification,
    markNotificationAsRead,
  } = useContext(GroupContext);

  const unreadNotifications = unreadNotificationsFunc(notification);
  const modifiedNotifications = notification.map((n) => {
    const sender = allUser.find((user) => user._id == n.user_id);
    return {
      ...n,
      senderName: sender?.name,
    };
  });
  return (
    <div className="notifications">
      <div className="notifications-icon" onClick={() => setIsOpen(!isOpen)}>
        <IconBell
          style={{ width: "30px", height: "30px" }}
          color="black"
          stroke={1.5}
        />
        {unreadNotifications?.length === 0 ? null : (
          <span className="notification-count">
            <span>{unreadNotifications?.length}</span>
          </span>
        )}
      </div>
      {isOpen ? (
        <div className="notifications-box">
          <div className="notifications-header">
            <h3>Notifications</h3>
            <div
              className="mark-as-read"
              onClick={() => markAllNotification(notification)}
            >
              Mark all as read
            </div>
          </div>
          {modifiedNotifications?.length === 0 ? (
            <span className="notification">No notification yet</span>
          ) : null}
          {modifiedNotifications &&
            modifiedNotifications.map((n, index) => {
              return (
                <div
                  key={index}
                  className={
                    n.isRead ? "notification" : "notification not-read"
                  }
                  onClick={() =>
                    markNotificationAsRead(n, userGroups, user, notification)
                  }
                >
                  <span>{`${n.senderName} sent a new message`}</span>
                  <span className="notification-time">
                    {moment(n.date).calendar()}
                  </span>
                </div>
              );
            })}
        </div>
      ) : null}
    </div>
  );
};

export default Notifications;
