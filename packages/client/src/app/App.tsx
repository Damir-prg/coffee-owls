import React, { useEffect } from 'react';
import './App.css';
import { ConfigProvider } from 'antd';
import { appLightThemeConfig } from 'shared/styles/ant/ant.config';
import WithRoutes from 'widgets/WithRoutes/WithRoutes';
import { store } from 'shared/store/store';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

function App() {
  useEffect(() => {
    const fetchServerData = async () => {
      const url = `http://localhost:${__SERVER_PORT__}`;
      const response = await fetch(url);
      const data = await response.json();
      console.log(data);
    };
    fetchServerData();
  }, []);

  return (
    <Provider store={store}>
      <BrowserRouter>
        <ConfigProvider theme={appLightThemeConfig}>
          <div className="app">
            <WithRoutes />
          </div>
        </ConfigProvider>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
