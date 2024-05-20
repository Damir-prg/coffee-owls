import { useEffect } from 'react';
import './App.css';
import { ConfigProvider } from 'antd';
import { appLightThemeConfig } from 'shared/styles/ant/ant.config';
import WithRoutes from 'widgets/WithRoutes/WithRoutes';

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
    <ConfigProvider theme={appLightThemeConfig}>
      <div className="app">
        <WithRoutes />
      </div>
    </ConfigProvider>
  );
}

export default App;
