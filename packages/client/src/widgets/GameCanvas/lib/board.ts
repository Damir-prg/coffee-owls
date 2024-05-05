import { IBoardProps } from '../types/boardTypes';
import { ICellProps } from '../types/cellTypes';
import { Cell } from './cell';
import { cellColors } from './cellColors';

export class Board {
  private static instance: Board | null = null;
  private ctx: CanvasRenderingContext2D | null = null;
  /**
   * Можно будет изменять количество ячеек на доске.
   */
  private cellCount = 4;
  private cellWidth = 0;
  private cells: Array<Array<Cell>> = [];

  private constructor({ ctx, size }: IBoardProps) {
    if (!ctx) {
      throw new Error('Canvas is not defined');
    }

    // Определяем ссылку на canvas внутри класса
    this.ctx = ctx;

    // Задаём размеры canvas относительно переданного размера (Родительского элемента)
    // Не учитывается изменение размера родительского элемента,
    // так как при изменении размера canvas удаляется весь нарисованный контент.
    this.ctx.canvas.width = size;
    this.ctx.canvas.height = size;

    // Считаем ширину ячейки как отношение ширины холста к количеству ячеек в доске
    this.cellWidth = size / this.cellCount - 6;
  }

  /**
   * Проверяет, был ли создан экземпляр класса Board.
   *
   * @return {boolean} Возвращает true, если экземпляр класса Board был создан, в противном случае возвращает false.
   */
  public static isHasInstance() {
    return !!Board.instance;
  }

  /**
   * Возвращает экземпляр класса Board.
   *
   * Если экземпляр не существует, создается новый с использованием предоставленных свойств.
   *
   * @param {IBoardProps} props - Свойства, используемые для создания нового экземпляра класса Board, если он не существует.
   * @return {Board} экземпляр класса Board.
   */
  public static getInstance(props: IBoardProps): Board {
    if (!Board.instance) {
      Board.instance = new Board(props);
    }
    return Board.instance;
  }

  /**
   * Удаляет экземпляр класса Board.
   */
  public static deleteInstance() {
    Board.instance = null;
  }

  /**
   * Создает ячейки для игровой сетки.
   *
   * Эта функция перебирает количество столбцов и строк, указанных свойством `cellCount`,
   * и создает новый объект `Cell` для каждой ячейки в сетке. Координаты каждой ячейки
   * рассчитываются на основе текущих индексов столбца и строки.
   */
  private createCells() {
    for (let col = 0; col < this.cellCount; col++) {
      this.cells[col] = [];
      for (let row = 0; row < this.cellCount; row++) {
        const coordX = col * this.cellWidth + 5 * (col + 1);
        const coordY = row * this.cellWidth + 5 * (row + 1);

        this.cells[col][row] = new Cell({ coordX, coordY });
      }
    }
  }

  /**
   * Рисует ячейку на холсте.
   *
   * @param {Cell} cell - Ячейка, которую нужно нарисовать.
   */
  private drawCell(cell: Cell) {
    if (this.ctx === null || this.ctx === undefined) {
      throw new Error('Canvas is not defined');
    }

    const cornerRadius = 8;

    this.ctx.beginPath();
    // this.ctx.rect(cell.coordX, cell.coordY, this.cellWidth, this.cellWidth);

    this.ctx.moveTo(cell.coordX + cornerRadius, cell.coordY);
    this.ctx.lineTo(cell.coordX + this.cellWidth - cornerRadius, cell.coordY);
    this.ctx.quadraticCurveTo(
      cell.coordX + this.cellWidth,
      cell.coordY,
      cell.coordX + this.cellWidth,
      cell.coordY + cornerRadius,
    );
    this.ctx.lineTo(cell.coordX + this.cellWidth, cell.coordY + this.cellWidth - cornerRadius);
    this.ctx.quadraticCurveTo(
      cell.coordX + this.cellWidth,
      cell.coordY + this.cellWidth,
      cell.coordX + this.cellWidth - cornerRadius,
      cell.coordY + this.cellWidth,
    );
    this.ctx.lineTo(cell.coordX + cornerRadius, cell.coordY + this.cellWidth);
    this.ctx.quadraticCurveTo(
      cell.coordX,
      cell.coordY + this.cellWidth,
      cell.coordX,
      cell.coordY + this.cellWidth - cornerRadius,
    );
    this.ctx.lineTo(cell.coordX, cell.coordY + cornerRadius);
    this.ctx.quadraticCurveTo(cell.coordX, cell.coordY, cell.coordX + cornerRadius, cell.coordY);
    this.ctx.closePath();

    this.ctx.fillStyle = cellColors[cell.value];

    this.ctx.fill();

    if (cell.value) {
      const fontSize = this.cellWidth / 2;
      this.ctx.font = fontSize + 'px Londrina Shadow';
      this.ctx.fillStyle = 'black';
      this.ctx.textAlign = 'center';
      this.ctx.fillText(String(cell.value), cell.coordX + this.cellWidth / 2, cell.coordY + this.cellWidth / 1.5);
    }
  }

  /**
   * Отрисовка всех клеток на доске.
   *
   * Эта функция итерируется по каждой клетке на доске и вызывает метод `drawCell`,
   * чтобы нарисовать клетку на холсте.
   */
  private drawAllCells() {
    for (let col = 0; col < this.cellCount; col++) {
      for (let row = 0; row < this.cellCount; row++) {
        this.drawCell(this.cells[col][row]);
      }
    }
  }

  private pasteNewCell() {
    let countFree = 0;
    for (let i = 0; i < this.cellCount; i++) {
      for (let j = 0; j < this.cellCount; j++) {
        if (!this.cells[i][j].value) {
          countFree++;
        }
      }
    }
    if (!countFree) {
      console.log('Game is over');
      return;
    }

    // eslint-disable-next-line no-constant-condition
    while (true) {
      const col = Math.floor(Math.random() * this.cellCount);
      const row = Math.floor(Math.random() * this.cellCount);
      if (!this.cells[col][row].value) {
        this.cells[col][row].value = (2 * Math.ceil(Math.random() * 2)) as ICellProps['value'];
        this.drawAllCells();
        return;
      }
    }
  }

  /**
   * Начинает игру, инициализируя холст и рисуя клетки.
   */
  public static startGame() {
    if (Board.instance && Board.instance.ctx) {
      const { width, height } = Board.instance.ctx.canvas;
      Board.instance.ctx.fillStyle = 'black';
      Board.instance.ctx.fillRect(0, 0, width, height);
      Board.instance.createCells();
      Board.instance.drawAllCells();
      Board.instance.pasteNewCell();
      Board.instance.pasteNewCell();
    } else {
      throw new Error('Canvas is not defined');
    }
  }

  /**
   * Очищает холст canvas, удаляя все его содержимое.
   */
  public static clear() {
    if (Board.instance && Board.instance.ctx) {
      const { width, height } = Board.instance.ctx.canvas;
      Board.instance.ctx.clearRect(0, 0, width, height);
    }
  }
}
