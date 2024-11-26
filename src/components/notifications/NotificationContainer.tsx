import React from 'react';
import { createPortal } from 'react-dom';
import { useNotifications } from '../../hooks/useNotifications';
import { Notification } from './Notification';

export const NotificationContainer: React.FC = () => {
  const { notifications } = useNotifications();

  return createPortal(
    <div className="fixed top-4 right-4 z-50 space-y-4 min-w-[320px] max-w-md">
      {notifications.map((notification) => (
        <Notification key={notification.id} {...notification} />
      ))}
    </div>,
    document.body
  );
};