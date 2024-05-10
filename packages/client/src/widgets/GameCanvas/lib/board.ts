import { IBoardProps } from '../types/boardTypes';
import { ICellProps } from '../types/cellTypes';
import { Cell } from './cell';

export class Board {
  private static instance: Board | null = null;
  private ctx: CanvasRenderingContext2D;
  /**
   * Можно будет изменять количество ячеек на доске.
   */
  private cellCount = 4;
  private cellWidth = 0;
  private boardGap = 5;
  private boardSizeCorrector = this.boardGap + Math.floor(this.boardGap / 5);
  private cells: Array<Array<Cell>> = [];

  private constructor({ ctx, size }: IBoardProps) {
    // Определяем ссылку на canvas внутри класса
    this.ctx = ctx;

    // Задаём размеры canvas относительно переданного размера (Родительского элемента)
    // Не учитывается изменение размера родительского элемента,
    // так как при изменении размера canvas удаляется весь нарисованный контент.
    this.ctx.canvas.width = size;
    this.ctx.canvas.height = size;

    // Считаем ширину ячейки как отношение ширины холста к количеству ячеек в доске
    this.cellWidth = size / this.cellCount - this.boardSizeCorrector;
  }

  private static checkIsBoard(instance: Board | null): instance is Board {
    if (instance) {
      return true;
    }
    return false;
  }

  /**
   * Проверяет, был ли создан экземпляр класса Board.
   *
   * @return {boolean} Возвращает true, если экземпляр класса Board был создан, в противном случае возвращает false.
   */
  public static hasInstance() {
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
        const coordX = col * this.cellWidth + this.boardGap * (col + 1);
        const coordY = row * this.cellWidth + this.boardGap * (row + 1);

        this.cells[col][row] = new Cell({ coordX, coordY, width: this.cellWidth, parentCtx: this.ctx });
      }
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
        this.cells[col][row].drawCell();
      }
    }
  }

  /**
   * Вставляет новую ячейку на доске, если хотя бы одна ячейка свободна.
   */
  private pasteNewCell() {
    const emptyCells = this.cells.flat().filter(cell => !cell.value);

    if (!emptyCells.length) {
      console.log('Игра закончена, ходов больше нет :(');
      return;
    }

    const index = Math.floor(Math.random() * emptyCells.length);
    const newCell = emptyCells[index];

    newCell.value = (2 * Math.ceil(Math.random() * 2)) as ICellProps['value'];
    newCell.drawCell();
  }

  /**
   * Начинает игру, инициализируя холст и рисуя клетки.
   */
  public static startGame() {
    if (!Board.checkIsBoard(Board.instance)) {
      throw new Error('Экземпляр Board уже существует');
    }

    const { width, height } = Board.instance.ctx.canvas;
    Board.instance.ctx.fillStyle = 'black';
    Board.instance.ctx.fillRect(0, 0, width, height);
    Board.instance.createCells();
    Board.instance.drawAllCells();
    Board.instance.pasteNewCell();
    Board.instance.pasteNewCell();
  }

  /**
   * Очищает холст canvas, удаляя все его содержимое.
   */
  public static clear() {
    if (!Board.checkIsBoard(Board.instance)) {
      throw new Error('Экземпляр Board уже существует');
    }

    const { width, height } = Board.instance.ctx.canvas;
    Board.instance.ctx.clearRect(0, 0, width, height);
  }
}
