import React from 'react';
import { Clock } from 'lucide-react';
import { eventBus } from '../utils/eventBus';
import { az } from '../constants/translations';

export const DemoContent: React.FC = () => {
  const simulateAccessRequest = () => {
    eventBus.emit('MEDICAL_ACCESS_REQUEST', {
      doctor: {
        id: '1',
        name: 'Dr. Əli Məmmədov',
        specialization: 'Kardioloq',
        requestedDuration: '24 saat',
        photoUrl: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&auto=format&fit=crop&q=60'
      }
    });
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Tibbi Portal Demo</h1>
        <button
          onClick={simulateAccessRequest}
          className="w-full flex items-center justify-center space-x-2 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors"
        >
          <Clock className="h-5 w-5" />
          <span>{az.notifications.simulateRequest}</span>
        </button>
      </div>
    </div>
  );
};