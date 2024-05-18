export interface IBoardProps {
  ctx: CanvasRenderingContext2D;
  size: number;
  controls: {
    up: string;
    down: string;
    left: string;
    right: string;
  };
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
