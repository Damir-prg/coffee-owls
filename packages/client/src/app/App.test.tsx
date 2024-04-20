import App from './App';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

const appContent = 'Главная страница';

// @ts-ignore
global.fetch = jest.fn(() => Promise.resolve({ json: () => Promise.resolve('hey') }));

test('Example test', async () => {
  render(
    <BrowserRouter>
      <App />
    </BrowserRouter>,
  );
  expect(screen.getByText(appContent)).toBeDefined();
});
