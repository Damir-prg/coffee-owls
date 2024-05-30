import React from 'react';
import ReactDOM from 'react-dom/server';
import HomeSSR from 'pages/Home/HomeSSR';

/**
 * Временное решение до добавления Router и Redux
 *  */
export const render = () => ReactDOM.renderToString(<HomeSSR />);
