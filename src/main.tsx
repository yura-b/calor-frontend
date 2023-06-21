import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import '@csstools/normalize.css';
import './index.css';
import { Provider } from 'react-redux';
import { store } from '@/store/store.ts';
import { QueryClient, QueryClientProvider } from 'react-query';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <QueryClientProvider client={new QueryClient()}>
        <App />
      </QueryClientProvider>
    </Provider>
  </React.StrictMode>
);
