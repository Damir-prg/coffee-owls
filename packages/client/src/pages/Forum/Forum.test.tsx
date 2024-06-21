import { act, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
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

  test('Добавление топика', async () => {
    const newTopicButton = await screen.getByRole('button', {
      name: 'plus Добавить Топик',
    });
    expect(newTopicButton).toBeDefined();

    await act(async () => {
      await userEvent.click(newTopicButton);
    });
    expect(screen.getByText('Добавить обсуждение')).toBeDefined();

    await act(async () => {
      await userEvent.type(screen.getByRole('textbox'), 'New topic1');
      await userEvent.click(
        screen.getByRole('button', {
          name: 'Добавить',
        }),
      );
    });
    expect(screen.getByText('New topic1')).toBeDefined();
  });
});
