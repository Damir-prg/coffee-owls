import React from 'react';
import ReactDOM from 'react-dom/server';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import { reducer } from 'shared/store/store';
import { Request as ExpressRequest } from 'express';
import { createStaticHandler, createStaticRouter, StaticRouterProvider } from 'react-router-dom/server';
import { createContext, createFetchRequest, createUrl } from 'shared/utils/entry-server.utils.ts';
import { matchRoutes } from 'react-router-dom';
import { routes } from 'widgets/WithRoutes/WithRoutes';
import { setPageHasBeenInitializedOnServer } from 'shared/store/ssr/ssrSlice';
import { createCache, extractStyle, StyleProvider } from '@ant-design/cssinjs';
import { ConfigProvider } from 'antd';
import { appLightThemeConfig } from 'shared/styles/ant/ant.config';

export const render = async (req: ExpressRequest) => {
  const { query, dataRoutes } = createStaticHandler(routes);
  const fetchRequest = createFetchRequest(req);
  const context = await query(fetchRequest);

  if (context instanceof Response) {
    throw context;
  }

  const store = configureStore({
    reducer,
  });

  const url = createUrl(req);

  const foundRoutes = matchRoutes(routes, url);
  if (!foundRoutes) {
    throw new Error('Страница не найдена!');
  }

  const [
    {
      route: { fetchData },
    },
  ] = foundRoutes;

  store.dispatch(setPageHasBeenInitializedOnServer(true));

  try {
    await fetchData({
      dispatch: store.dispatch,
      state: store.getState(),
      ctx: createContext(req),
    });
  } catch (e) {
    console.log('Инициализация страницы произошла с ошибкой', e);
  }

  store.dispatch(setPageHasBeenInitializedOnServer(true));
  const router = createStaticRouter(dataRoutes, context);

  const cache = createCache();

  try {
    const html = ReactDOM.renderToString(
      <StyleProvider cache={cache}>
        <ConfigProvider theme={appLightThemeConfig}>
          <Provider store={store}>
            <StaticRouterProvider router={router} context={context} />
          </Provider>
        </ConfigProvider>
      </StyleProvider>,
    );

    const styleText = extractStyle(cache);

    return {
      html,
      styleTags: styleText,
      initialState: store.getState(),
    };
  } catch (e) {
    console.log('Ошибка при рендеринге:', e);
    throw e;
  }
};
