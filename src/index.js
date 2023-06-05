import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { Slide, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AuthProvider from './context/AuthContext';
import { QueryProvider } from './context/QueryContext';
import { QueryClient, QueryClientProvider } from 'react-query';
import Compose from './context/store';
import { ChatProvider } from './context/ChatContext';
import ErrorBoundary from './components/ErrorBoundary';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <ErrorBoundary>
      <Compose components={[AuthProvider, QueryProvider, ChatProvider]}>
        <QueryClientProvider client={queryClient}>
          <App />
          <ToastContainer rtl limit={1} theme="colored" transition={Slide}/>
        </QueryClientProvider>
      </Compose>
    </ErrorBoundary>
  </BrowserRouter>
);

