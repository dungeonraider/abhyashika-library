import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';
import { DatabaseService } from './services/database/database.service';
import { handleError } from './utils/errors/errorHandler';

const initializeApp = async () => {
  try {
    // Initialize database
    DatabaseService.initialize();

    const root = document.getElementById('root');
    if (!root) throw new Error('Root element not found');

    createRoot(root).render(
      <StrictMode>
        <App />
      </StrictMode>
    );
  } catch (error) {
    console.error('Failed to initialize application:', error);
    handleError(error);
  }
};

initializeApp();