import { act, render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Forum from 'pages/Forum/Forum';
import { Provider } from 'react-redux';
import { store } from 'shared/store/store';

describe('Страница форума', () => {
  beforeEach(() => {
    act(() => {
      render(
        <Provider store={store}>
          <BrowserRouter>
            <Forum />
          </BrowserRouter>
          ,
        </Provider>,
      );
    });
  });

  test('Основная информация страницы', async () => {
    expect(screen.getByText('Форум 2048')).toBeDefined();
    expect(screen.getByText('Топики для обсуждения')).toBeDefined();
  });
});
