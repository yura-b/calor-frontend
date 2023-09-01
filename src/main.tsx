import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import '@csstools/normalize.css';
import './index.css';
import { Provider } from 'react-redux';
import { store } from '@/store/store.ts';
import { QueryClient, QueryClientProvider } from 'react-query';
import { GoogleOAuthProvider } from '@react-oauth/google';
import TagManager from 'react-gtm-module';

const GOOGLE_CLIENT_ID = import.meta.env.GOOGLE_CLIENT_ID;
const GTM_ID = import.meta.env.VITE_GTM_ID;

const tagManagerArgs = {
  gtmId: GTM_ID
}

TagManager.initialize(tagManagerArgs)

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <QueryClientProvider client={new QueryClient()}>
        <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
          <App />
        </GoogleOAuthProvider>
      </QueryClientProvider>
    </Provider>
  </React.StrictMode>
);
