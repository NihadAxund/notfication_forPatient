export type NotificationType = 'request' | 'success' | 'error' | 'info';

export interface Doctor {
  id: string;
  name: string;
  specialization: string;
  requestedDuration: string;
  photoUrl?: string;
}

export interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  duration?: number;
  doctor?: Doctor;
  onAccept?: () => void;
  onReject?: () => void;
  onClose?: () => void;
}