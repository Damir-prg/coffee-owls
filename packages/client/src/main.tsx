import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './app/App';
import './index.css';

// Регистрация serviceWorker для оффлайн режима
if ('serviceWorker' in navigator) {
  window.addEventListener('load', async () => {
    try {
      await navigator.serviceWorker.register('/sw.js', { type: 'module' });
    } catch (error) {
      console.log('ServiceWorker registration failed: ', error);
    }
  });
}

ReactDOM.hydrateRoot(
  document.getElementById('root') as HTMLElement,
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
