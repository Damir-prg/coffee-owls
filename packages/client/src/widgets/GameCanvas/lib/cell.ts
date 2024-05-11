import { ICellProps } from '../types/cellTypes';
import { cellColors } from './cellColors';

export class Cell implements ICellProps {
  public value: ICellProps['value'] = 0;
  public coordX = 0;
  public coordY = 0;
  public width = 0;
  public parentCtx: CanvasRenderingContext2D;
  private cornerRadius = 8;

  constructor({ coordX, coordY, width, parentCtx }: Omit<ICellProps, 'value'>) {
    this.coordX = coordX;
    this.coordY = coordY;
    this.width = width;
    this.parentCtx = parentCtx;
  }

  /**
   * Рисует ячейку на холсте.
   *
   * Этот метод использует родительский контекст для рисования закругленной прямоугольной формы, представляющей ячейку.
   * Цвет ячейки определяется свойством значения и заполняется с использованием родительского контекста.
   * Если значение не пустое, оно отображается в центре ячейки.
   */
  public drawCell() {
    this.parentCtx.beginPath();

    this.parentCtx.moveTo(this.coordX + this.cornerRadius, this.coordY);
    this.parentCtx.lineTo(this.coordX + this.width - this.cornerRadius, this.coordY);
    this.parentCtx.quadraticCurveTo(
      this.coordX + this.width,
      this.coordY,
      this.coordX + this.width,
      this.coordY + this.cornerRadius,
    );
    this.parentCtx.lineTo(this.coordX + this.width, this.coordY + this.width - this.cornerRadius);
    this.parentCtx.quadraticCurveTo(
      this.coordX + this.width,
      this.coordY + this.width,
      this.coordX + this.width - this.cornerRadius,
      this.coordY + this.width,
    );
    this.parentCtx.lineTo(this.coordX + this.cornerRadius, this.coordY + this.width);
    this.parentCtx.quadraticCurveTo(
      this.coordX,
      this.coordY + this.width,
      this.coordX,
      this.coordY + this.width - this.cornerRadius,
    );
    this.parentCtx.lineTo(this.coordX, this.coordY + this.cornerRadius);
    this.parentCtx.quadraticCurveTo(this.coordX, this.coordY, this.coordX + this.cornerRadius, this.coordY);
    this.parentCtx.closePath();

    this.parentCtx.fillStyle = cellColors[this.value];

    this.parentCtx.fill();

    if (this.value) {
      const fontSize = this.width / 2;
      this.parentCtx.font = fontSize + 'px Londrina Shadow';
      this.parentCtx.fillStyle = 'black';
      this.parentCtx.textAlign = 'center';
      this.parentCtx.fillText(String(this.value), this.coordX + this.width / 2, this.coordY + this.width / 1.5);
    }
  }
}
