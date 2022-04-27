import dotenv from 'dotenv'
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

// import { createRoot } from 'react-dom/client';
// const container = document.getElementById('app');
// const root = createRoot(container);

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
