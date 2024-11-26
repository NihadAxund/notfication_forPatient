import React, { createContext, useContext, useReducer, useCallback, useEffect } from 'react';
import { NotificationType, Notification } from '../types/notifications';
import { eventBus } from '../utils/eventBus';
import { az } from '../constants/translations';

interface NotificationContextType {
  notifications: Notification[];
  addNotification: (notification: Omit<Notification, 'id'>) => void;
  removeNotification: (id: string) => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

type NotificationAction =
  | { type: 'ADD_NOTIFICATION'; payload: Notification }
  | { type: 'REMOVE_NOTIFICATION'; payload: string };

const notificationReducer = (state: Notification[], action: NotificationAction): Notification[] => {
  switch (action.type) {
    case 'ADD_NOTIFICATION':
      return [...state, action.payload];
    case 'REMOVE_NOTIFICATION':
      return state.filter((notification) => notification.id !== action.payload);
    default:
      return state;
  }
};

export const NotificationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [notifications, dispatch] = useReducer(notificationReducer, []);

  const addNotification = useCallback((notification: Omit<Notification, 'id'>) => {
    const id = Math.random().toString(36).substr(2, 9);
    dispatch({
      type: 'ADD_NOTIFICATION',
      payload: { ...notification, id },
    });
  }, []);

  const removeNotification = useCallback((id: string) => {
    dispatch({
      type: 'REMOVE_NOTIFICATION',
      payload: id,
    });
  }, []);

  useEffect(() => {
    const unsubscribe = eventBus.subscribe('MEDICAL_ACCESS_REQUEST', (data: any) => {
      addNotification({
        type: 'request',
        title: az.notifications.requestTitle,
        message: `${data.doctor.name} ${az.notifications.hasRequestedAccess}`,
        doctor: data.doctor,
        onAccept: () => {
          eventBus.emit('ACCESS_GRANTED', { doctorId: data.doctor.id });
          addNotification({
            type: 'success',
            title: az.notifications.accessGranted,
            message: `${data.doctor.name} ${az.notifications.nowHasAccess} ${data.doctor.requestedDuration} ${az.notifications.accessDuration}`,
            duration: 5000,
          });
        },
        onReject: () => {
          eventBus.emit('ACCESS_DENIED', { doctorId: data.doctor.id });
          addNotification({
            type: 'error',
            title: az.notifications.accessDenied,
            message: `${data.doctor.name} ${az.notifications.accessDenied}`,
            duration: 5000,
          });
        },
      });
    });

    return () => unsubscribe();
  }, [addNotification]);

  return (
    <NotificationContext.Provider
      value={{ notifications, addNotification, removeNotification }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotifications = () => {
  const context = useContext(NotificationContext);
  if (context === undefined) {
    throw new Error('useNotifications must be used within a NotificationProvider');
  }
  return context;
};