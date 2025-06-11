import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { AppContextProvider } from './contexts/AppContext';

const rootElement = document.getElementById('root');

if(!rootElement) {
  throw new Error('Root element not found');
};

createRoot(rootElement).render(
  <StrictMode>
    <AppContextProvider>
      <App />
    </AppContextProvider>
  </StrictMode>
);
