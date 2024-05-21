export const appLightThemeConfig = {
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
    colorSplit: '#F65E3B',
    colorWarningBorder: '#F65E3B',
    colorWarningBg: '#FDF9F8',
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
      onlyIconSize: 24,
    },
    Typography: {
      titleMarginBottom: 0,
      titleMarginTop: 0,
    },
    Input: {
      inputFontSizeLG: 16,
      paddingBlockLG: 8,
    },
    List: {
      itemPaddingSM: '8px 0',
      itemPaddingLG: '24px',
    },
    Tabs: {
      titleFontSizeLG: 30,
      horizontalMargin: '0 0 24px',
    },
  },
};
