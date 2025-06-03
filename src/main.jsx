import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css'; // If you have extra CSS
import App from './App.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
);
