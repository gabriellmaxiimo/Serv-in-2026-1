import { notification } from "antd";

export const openSuccessNotification = (title: string, description?: string) => {
  notification.success({
    title,
    description,
  });
};
