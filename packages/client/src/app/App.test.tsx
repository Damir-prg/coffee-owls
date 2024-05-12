import App from './App';
import { render, screen, act } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

const appContent = 'Загрузка..';

// @ts-ignore
global.fetch = jest.fn(() => Promise.resolve({ json: () => Promise.resolve('hey') }));

jest.mock('shared/api/authApi', () => ({
  getUser: jest.fn().mockResolvedValueOnce('mockedUserResponse'),
}));

test('Example test', async () => {
  act(() => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>,
    );
  });
  expect(screen.getByText(appContent)).toBeDefined();
});
