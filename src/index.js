import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import AppContainers from './containers/AppContainers';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AppContainers />
  </React.StrictMode>
);

