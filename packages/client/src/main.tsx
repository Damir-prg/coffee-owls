import React, { useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { store } from 'shared/store/store';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { routes } from 'widgets/WithRoutes/WithRoutes';
import { ConfigProvider } from 'antd';
import { appLightThemeConfig, appDarkThemeConfig } from 'shared/styles/ant/ant.config';
import { TRootState } from 'shared/store/store';
import { ETHEME } from 'shared/enums/theme';

import './index.css';
import { setTheme } from 'shared/store/themeSlice';

const router = createBrowserRouter(routes);

const App = () => {
  const dispatch = useDispatch();
  const theme = useSelector((state: TRootState) => state.theme.theme);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as ETHEME.Light | ETHEME.Dark;
    if (savedTheme) {
      dispatch(setTheme(savedTheme));
    } else {
      localStorage.setItem('theme', theme);
    }
  }, [dispatch]);

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
      await navigator.serviceWorker.register('/sw.js', { type: 'module' });
    } catch (error) {
      console.log('ServiceWorker registration failed: ', error);
    }
  });
}

ReactDOM.hydrateRoot(
  document.getElementById('root') as HTMLElement,
  <Provider store={store}>
    <App />
  </Provider>,
);
