import React from 'react';
import { Check, X, Info, ChevronRight } from 'lucide-react';
import { NotificationType } from '../../types/notifications';
import { az } from '../../constants/translations';

interface NotificationProps {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  duration?: number;
  doctor?: {
    name: string;
    specialization: string;
    requestedDuration: string;
    photoUrl?: string;
  };
  onAccept?: () => void;
  onReject?: () => void;
  onClose?: () => void;
}

export const Notification: React.FC<NotificationProps> = ({
  type,
  title,
  message,
  doctor,
  onAccept,
  onReject,
  onClose,
}) => {
  const [isExpanded, setIsExpanded] = React.useState(false);

  return (
    <div
      className={`
        transform transition-all duration-300 ease-out
        translate-x-0 opacity-100 scale-100
        bg-white rounded-lg shadow-lg overflow-hidden
        border-l-4 ${
          type === 'request' ? 'border-blue-500' : 
          type === 'success' ? 'border-green-500' : 
          type === 'error' ? 'border-red-500' : 'border-gray-500'
        }
      `}
    >
      <div className="p-4">
        <div className="flex items-start">
          {doctor?.photoUrl && (
            <img
              src={doctor.photoUrl}
              alt={doctor.name}
              className="w-12 h-12 rounded-full object-cover mr-3"
            />
          )}
          <div className="flex-1">
            <p className="text-sm font-medium text-gray-900">{title}</p>
            <p className="mt-1 text-sm text-gray-500">{message}</p>
            
            {doctor && (
              <div className="mt-2">
                <button
                  onClick={() => setIsExpanded(!isExpanded)}
                  className="flex items-center text-sm text-blue-500 hover:text-blue-700"
                >
                  <span>{az.notifications.viewDetails}</span>
                  <ChevronRight
                    className={`ml-1 h-4 w-4 transform transition-transform ${
                      isExpanded ? 'rotate-90' : ''
                    }`}
                  />
                </button>
                
                {isExpanded && (
                  <div className="mt-2 p-2 bg-gray-50 rounded-md">
                    <p className="text-sm text-gray-700">
                      <strong>{az.notifications.doctor}:</strong> {doctor.name}
                    </p>
                    <p className="text-sm text-gray-700">
                      <strong>{az.notifications.specialization}:</strong> {doctor.specialization}
                    </p>
                    <p className="text-sm text-gray-700">
                      <strong>{az.notifications.duration}:</strong> {doctor.requestedDuration}
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
          
          {onClose && (
            <button
              onClick={onClose}
              className="ml-4 flex-shrink-0 rounded-md p-1.5 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <X className="h-5 w-5 text-gray-400" />
            </button>
          )}
        </div>

        {type === 'request' && (
          <div className="mt-4 flex space-x-3">
            <button
              onClick={onAccept}
              className="flex-1 rounded-md bg-blue-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {az.notifications.accept}
            </button>
            <button
              onClick={onReject}
              className="flex-1 rounded-md bg-gray-100 px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500"
            >
              {az.notifications.reject}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};