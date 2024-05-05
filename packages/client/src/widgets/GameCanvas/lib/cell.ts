import { ICellProps } from '../types/cellTypes';

export class Cell implements ICellProps {
  public value: ICellProps['value'] = 0;
  public coordX = 0;
  public coordY = 0;

  constructor({ coordX, coordY }: Pick<ICellProps, 'coordX' | 'coordY'>) {
    this.coordX = coordX;
    this.coordY = coordY;
  }
}
