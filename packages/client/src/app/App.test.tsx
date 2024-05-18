import App from './App';
import { render, screen, act } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from 'shared/store/store';

const appContent = 'Загрузка..';

// @ts-ignore
global.fetch = jest.fn(() => Promise.resolve({ json: () => Promise.resolve('hey') }));

jest.mock('shared/api/authApi', () => ({
  getUser: jest.fn().mockResolvedValueOnce('mockedUserResponse'),
}));

test('Example test', async () => {
  act(() => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>,
    );
  });
  expect(screen.getByText(appContent)).toBeDefined();
});
