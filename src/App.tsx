import React from 'react';
import { NotificationProvider } from './hooks/useNotifications';
import { NotificationContainer } from './components/notifications/NotificationContainer';
import { DemoContent } from './components/DemoContent';

function App() {
  return (
    <NotificationProvider>
      <DemoContent />
      <NotificationContainer />
    </NotificationProvider>
  );
}

export default App;