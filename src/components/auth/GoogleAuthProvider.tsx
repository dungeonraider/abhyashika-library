import React, { useEffect } from 'react';
import { googleConfig } from '../../config/google';

interface GoogleAuthProviderProps {
  children: React.ReactNode;
}

export default function GoogleAuthProvider({ children }: GoogleAuthProviderProps) {
  useEffect(() => {
    // Load Google API Script
    const loadGoogleScript = () => {
      const script = document.createElement('script');
      script.src = 'https://apis.google.com/js/platform.js';
      script.async = true;
      script.defer = true;
      script.onload = () => {
        initializeGoogleAuth();
      };
      document.body.appendChild(script);
    };

    const initializeGoogleAuth = () => {
      window.gapi?.load('auth2', () => {
        window.gapi.auth2.init({
          client_id: googleConfig.clientId,
          scope: 'email profile'
        });
      });
    };

    loadGoogleScript();
  }, []);

  return <>{children}</>;
}