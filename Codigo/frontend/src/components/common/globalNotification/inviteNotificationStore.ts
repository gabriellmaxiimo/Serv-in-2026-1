export type InviteNotification = {
  title: string;
  description?: string;
};

const INVITE_NOTIFICATION_KEY = "servin-invite-notification";
const INVITE_NOTIFICATION_EVENT = "servin-invite-notification-changed";

export const getInviteNotification = (): InviteNotification | null => {
  const raw = sessionStorage.getItem(INVITE_NOTIFICATION_KEY);

  if (!raw) {
    return null;
  }

  try {
    return JSON.parse(raw) as InviteNotification;
  } catch {
    return null;
  }
};

export const setInviteNotification = (notification: InviteNotification) => {
  sessionStorage.setItem(INVITE_NOTIFICATION_KEY, JSON.stringify(notification));
  window.dispatchEvent(new Event(INVITE_NOTIFICATION_EVENT));
};

export const clearInviteNotification = () => {
  sessionStorage.removeItem(INVITE_NOTIFICATION_KEY);
  window.dispatchEvent(new Event(INVITE_NOTIFICATION_EVENT));
};

export const inviteNotificationEventName = INVITE_NOTIFICATION_EVENT;