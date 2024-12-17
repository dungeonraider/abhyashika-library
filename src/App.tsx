import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { AuthProvider } from './contexts/AuthContext';
import { googleConfig } from './config/google';
import ErrorBoundary from './components/error/ErrorBoundary';
import AppRoutes from './routes';
import Header from './components/Header';
import Footer from './components/footer/Footer';

const App = () => {
  return (
    <ErrorBoundary>
      <GoogleOAuthProvider clientId={googleConfig.clientId}>
        <Router>
          <AuthProvider>
            <div className="min-h-screen bg-gray-50">
              <Header />
              <Toaster 
                position="bottom-center"
                toastOptions={{
                  duration: 5000,
                  success: {
                    duration: 3000,
                  },
                  error: {
                    duration: 5000,
                  },
                }} 
              />
              <AppRoutes />
              <Footer />
            </div>
          </AuthProvider>
        </Router>
      </GoogleOAuthProvider>
    </ErrorBoundary>
  );
};

export default App;