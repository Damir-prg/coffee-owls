import { cellColors } from '../lib/cellColors';

export interface ICellProps {
  value: keyof typeof cellColors;
  coordX: number;
  coordY: number;
  width: number;
  parentCtx: CanvasRenderingContext2D;
}
