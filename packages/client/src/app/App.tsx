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
    fontSize: 24,
    fontFamily: 'Nunito Sans, Arial, sans-serif',
    fontSizeHeading1: 46,
    fontSizeHeading2: 38,
    fontSizeHeading3: 30,
  },
  components: {
    Layout: {
      bodyBg: '#f8e6cd',
      headerBg: 'inherit',
      footerBg: 'inherit',
    },
    Button: {
      contentFontSize: 14,
      contentLineHeight: 1.5,
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
