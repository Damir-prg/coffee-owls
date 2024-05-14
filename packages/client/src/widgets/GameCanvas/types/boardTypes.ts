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
