import { Board } from 'widgets/GameCanvas/lib/board';
import { BOARD_CONTROLS } from 'widgets/GameCanvas/types/boardTypes';
import userEvent from '@testing-library/user-event';

describe('Тестирование игры', () => {
  let board: Board | null = null;
  beforeEach(() => {
    const canvas = document.createElement('canvas');
    board = Board.getInstance({
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      ctx: canvas.getContext('2d')!,
      size: 640,
      controls: BOARD_CONTROLS,
      isTest: true,
    });

    Board.setScoreHandler(() => void 0);
  });

  test('Одинаковое значение начальных ячеек', async () => {
    Board.startGame([
      {
        staticIndex: 0,
        value: 2,
      },
      {
        staticIndex: 13,
        value: 2,
      },
    ]);

    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const flattenSells = board!.Cells.flat();

    expect(flattenSells[0].value).toBe(2);
    expect(flattenSells[13].value).toBe(2);

    await userEvent.keyboard('[ArrowLeft]');
    expect(flattenSells[13].value).toBe(0);
    expect(flattenSells[1].value).toBe(2);

    await userEvent.keyboard('[ArrowDown]');
    expect(flattenSells[0].value).toBe(0);
    expect(flattenSells[1].value).toBe(0);
    expect(flattenSells[3].value).toBe(4);

    await userEvent.keyboard('[ArrowRight]');
    expect(flattenSells[3].value).toBe(0);
    expect(flattenSells[15].value).toBe(4);

    await userEvent.keyboard('[ArrowUp]');
    expect(flattenSells[15].value).toBe(0);
    expect(flattenSells[12].value).toBe(4);
  });

  test('Разное значение начальных ячеек', async () => {
    Board.startGame([
      {
        staticIndex: 2,
        value: 4,
      },
      {
        staticIndex: 8,
        value: 2,
      },
    ]);
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const flattenSells = board!.Cells.flat();

    expect(flattenSells[2].value).toBe(4);
    expect(flattenSells[8].value).toBe(2);

    await userEvent.keyboard('[ArrowDown]');
    expect(flattenSells[3].value).toBe(4);
    expect(flattenSells[11].value).toBe(2);

    await userEvent.keyboard('[ArrowRight]');
    expect(flattenSells[11].value).toBe(4);
    expect(flattenSells[15].value).toBe(2);

    await userEvent.keyboard('[ArrowUp]');
    expect(flattenSells[8].value).toBe(4);
    expect(flattenSells[12].value).toBe(2);

    await userEvent.keyboard('[ArrowLeft]');
    expect(flattenSells[0].value).toBe(4);
    expect(flattenSells[4].value).toBe(2);
  });
});
