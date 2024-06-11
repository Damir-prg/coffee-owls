import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from 'shared/store/store';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { routes } from 'widgets/WithRoutes/WithRoutes';
import { ConfigProvider } from 'antd';
import { appLightThemeConfig } from 'shared/styles/ant/ant.config';

import './index.css';

const router = createBrowserRouter(routes);

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
  <Provider store={store}>
    <ConfigProvider theme={appLightThemeConfig}>
      <RouterProvider router={router} />
    </ConfigProvider>
  </Provider>,
);
