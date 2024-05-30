import React from 'react';
import ReactDOM from 'react-dom/server';
import { App } from 'antd';

/** Временное решение использовать App из antd (чтобы отображался проект),
 *  до добавления Router и Redux
 *  Из-за этого есть ошибка анта в консоли про className
 *  */
export const render = () => ReactDOM.renderToString(<App />);
