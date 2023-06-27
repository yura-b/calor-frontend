import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import '@csstools/normalize.css';
import './index.css';
import { Provider } from 'react-redux';
import { store } from '@/store/store.ts';
import { QueryClient, QueryClientProvider } from 'react-query';
import { GoogleOAuthProvider } from '@react-oauth/google';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <QueryClientProvider client={new QueryClient()}>
        <GoogleOAuthProvider clientId="352361031995-3huasr1q21c4l3mktm2l64pvddkbac7j.apps.googleusercontent.com">
          <App />
        </GoogleOAuthProvider>
        ;
      </QueryClientProvider>
    </Provider>
  </React.StrictMode>
);
