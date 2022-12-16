import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AuthProvider from './context/AuthContext';
import { QueryProvider } from './context/QueryContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <AuthProvider>
      <QueryProvider>
        <App/>
        <ToastContainer rtl limit={1}/>
      </QueryProvider>
    </AuthProvider>
  </BrowserRouter>
);

