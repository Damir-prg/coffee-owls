import { ICellProps } from 'widgets/GameCanvas/types/cellTypes';

export interface IBoardProps {
  ctx: CanvasRenderingContext2D;
  size: number;
  controls: {
    up: string;
    down: string;
    left: string;
    right: string;
  };
  isTest?: boolean;
}

/**
 * mock данных для тестирования
 */
export interface IPasteCellParams {
  staticIndex: number;
  value: ICellProps['value'];
}

export type TUnionCells =
  | {
      direction: 'left' | 'right';
      col: number;
    }
  | {
      direction: 'up' | 'down';
      row: number;
    };

export const BOARD_CONTROLS: IBoardProps['controls'] = {
  up: 'ArrowUp',
  down: 'ArrowDown',
  left: 'ArrowLeft',
  right: 'ArrowRight',
};
