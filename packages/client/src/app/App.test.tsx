import App from './App';
import { render, screen, act } from '@testing-library/react';

const appContent = 'Загрузка..';

// @ts-ignore
global.fetch = jest.fn(() => Promise.resolve({ json: () => Promise.resolve('hey') }));

jest.mock('shared/api/authApi/authApi', () => ({
  getUser: jest.fn().mockResolvedValueOnce('mockedUserResponse'),
}));

test('Example test', async () => {
  act(() => {
    render(<App />);
  });
  expect(screen.getByText(appContent)).toBeDefined();
});
