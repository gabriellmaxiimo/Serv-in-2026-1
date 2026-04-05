import { notification } from "antd";

export const openErrorNotification = (title: string, description?: string) => {
  notification.error({
    title,
    description,
  });
};
