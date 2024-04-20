import { useEffect } from 'react';
import './App.css';
import { ConfigProvider } from 'antd';
import WithRoutes from 'widgets/WithRoutes/WithRoutes';

const appLightTheme = {
  token: {
    colorBgContainer: '#f8e6cd',
    colorPrimary: '#F65E3B',
    colorText: '#333333',
    borderRadius: 8,
    fontFamily: 'Nunito Sans, Arial, sans-serif',
  },
  components: {
    Layout: {
      bodyBg: '#f8e6cd',
      headerBg: 'inherit',
      footerBg: 'inherit',
    },
    Button: {
      contentFontSizeLG: 20,
      paddingInlineLG: 22,
    },
  },
};

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
    <ConfigProvider theme={appLightTheme}>
      <div className="app">
        <WithRoutes />
      </div>
    </ConfigProvider>
  );
}

export default App;
