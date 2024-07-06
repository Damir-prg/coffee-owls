import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider, useSelector } from 'react-redux';
import { store } from 'shared/store/store';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { routes } from 'widgets/WithRoutes/WithRoutes';
import { ConfigProvider } from 'antd';
import { appLightThemeConfig, appDarkThemeConfig } from 'shared/styles/ant/ant.config';
import { TRootState } from 'shared/store/store';
import { ETHEME } from 'shared/enums/theme';

import './index.css';
import ThemeProvider from 'shared/components/ThemeProvider/ThemeProvider';

const router = createBrowserRouter(routes);

const App = () => {
  const theme = useSelector((state: TRootState) => state.theme.theme);

  return (
    <ConfigProvider theme={theme === ETHEME.Light ? appLightThemeConfig : appDarkThemeConfig}>
      <RouterProvider router={router} />
    </ConfigProvider>
  );
};

// Регистрация serviceWorker для оффлайн режима
if ('serviceWorker' in navigator) {
  window.addEventListener('load', async () => {
    try {
      if (import.meta.env.PROD) {
        await navigator.serviceWorker.register('/sw.js');
      } else {
        const registrations = await navigator.serviceWorker.getRegistrations();

        for (const registration of registrations) {
          registration.unregister();
        }
      }
    } catch (error) {
      console.log('ServiceWorker registration failed: ', error);
    }
  });
}

ReactDOM.hydrateRoot(
  document.getElementById('root') as HTMLElement,
  <Provider store={store}>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </Provider>,
);
