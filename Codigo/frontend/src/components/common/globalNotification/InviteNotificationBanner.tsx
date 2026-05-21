import { useEffect, useState } from "react";
import { Alert, Button, Space } from "antd";
import {
  clearInviteNotification,
  getInviteNotification,
  inviteNotificationEventName,
  type InviteNotification,
} from "./inviteNotificationStore";

const InviteNotificationBanner = () => {
  const [notification, setNotification] = useState<InviteNotification | null>(() => getInviteNotification());

  useEffect(() => {
    const refresh = () => setNotification(getInviteNotification());

    window.addEventListener(inviteNotificationEventName, refresh);
    window.addEventListener("storage", refresh);

    return () => {
      window.removeEventListener(inviteNotificationEventName, refresh);
      window.removeEventListener("storage", refresh);
    };
  }, []);

  if (!notification) {
    return null;
  }

  return (
    <div style={{ padding: "16px 24px 0" }}>
      <Alert
        type="success"
        showIcon
        message={notification.title}
        description={notification.description}
        action={
          <Space>
            <Button size="small" onClick={clearInviteNotification}>
              Fechar
            </Button>
          </Space>
        }
      />
    </div>
  );
};

export default InviteNotificationBanner;