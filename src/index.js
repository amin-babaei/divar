import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AuthProvider from './context/AuthContext';
import { QueryProvider } from './context/QueryContext';
import { QueryClient, QueryClientProvider } from 'react-query';
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
    <AuthProvider>
    <QueryClientProvider client={queryClient}>
      <QueryProvider>
        <App/>
        <ToastContainer rtl limit={1}/>
      </QueryProvider>
    </QueryClientProvider>
    </AuthProvider>
  </BrowserRouter>
);

