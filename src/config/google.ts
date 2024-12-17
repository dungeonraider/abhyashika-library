export const googleConfig = {
  clientId: import.meta.env.VITE_GOOGLE_CLIENT_ID,
  scopes: ['email', 'profile'],
  allowedOrigins: [
    'https://abhyashika-library.vercel.app',
    'http://localhost:5173'
  ],
  flow: 'implicit',
  uxMode: 'popup',
  cookiePolicy: 'single_host_origin'
} as const;