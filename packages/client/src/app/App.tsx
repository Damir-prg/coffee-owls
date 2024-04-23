import { useEffect } from 'react';
import './App.css';
import { ConfigProvider } from 'antd';
import WithRoutes from 'widgets/WithRoutes/WithRoutes';

const appLightTheme = {
  token: {
    colorPrimary: '#F65E3B',
    colorText: '#333333',
    colorError: '#F65E3B',
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
    Menu: {
      colorBgContainer: 'inherit',
    },
    Button: {
      contentFontSize: 14,
      contentLineHeight: 1.5,
      contentFontSizeLG: 24,
    },
    Typography: {
      titleMarginBottom: 0,
      titleMarginTop: 0,
    },
    Input: {
      inputFontSizeLG: 16,
      paddingBlockLG: 8,
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
