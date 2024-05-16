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
  private boardGap = 10;
  private boardSizeCorrector = this.boardGap + Math.floor(this.boardGap / 5);
  private cells: Array<Array<Cell>> = [];
  private controls: IBoardProps['controls'];

  private constructor({ ctx, size, controls }: IBoardProps) {
    // Определяем ссылку на canvas внутри класса
    this.ctx = ctx;

    this.controls = controls;
    document.addEventListener('keydown', Board.eventHandler);

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
    if (Board.checkIsBoard(Board.instance)) {
      document.removeEventListener('keydown', Board.eventHandler);
    }

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
    for (let row = 0; row < this.cellCount; row++) {
      this.cells[row] = [];
      for (let col = 0; col < this.cellCount; col++) {
        const coordX = row * this.cellWidth + this.boardGap * (row + 1);
        const coordY = col * this.cellWidth + this.boardGap * (col + 1);

        this.cells[row][col] = new Cell({ coordX, coordY, width: this.cellWidth, parentCtx: this.ctx });
      }
    }
  }

  /**
   * Отрисовка всех клеток на доске.
   *
   * Эта функция итерируется по каждой клетке на доске и вызывает метод `drawCell`,
   * чтобы нарисовать клетку на холсте.
   */
  private static drawAllCells() {
    if (!Board.checkIsBoard(Board.instance)) {
      throw new Error('Board is not created');
    }

    const { cellCount, cells } = Board.instance;

    for (let row = 0; row < cellCount; row++) {
      for (let col = 0; col < cellCount; col++) {
        cells[row][col].drawCell();
      }
    }
  }

  /**
   * Вставляет новую ячейку на доске, если хотя бы одна ячейка свободна.
   */
  private static pasteNewCell() {
    if (!Board.checkIsBoard(Board.instance)) {
      throw new Error('Board is not created');
    }

    const { cells } = Board.instance;

    const emptyCells = cells.flat().filter(cell => !cell.value);

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
    Board.instance.ctx.fillStyle = '#BBAEA0';
    Board.instance.ctx.fillRect(0, 0, width, height);
    Board.instance.createCells();
    Board.drawAllCells();
    Board.pasteNewCell();
    Board.pasteNewCell();
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

  private static eventHandler(event: KeyboardEvent) {
    if (!Board.checkIsBoard(Board.instance)) {
      throw new Error('Экземпляр Board уже существует');
    }

    const { controls } = Board.instance;

    if (event.key === controls.down) {
      Board.moveDown();
    }
    if (event.key === controls.up) {
      Board.moveUp();
    }
    if (event.key === controls.right) {
      Board.moveRight();
    }
    if (event.key === controls.left) {
      Board.moveLeft();
    }
  }

  private static moveDown() {
    if (!Board.checkIsBoard(Board.instance)) {
      throw new Error('Экземпляр Board не инициализирован');
    }

    const { cells, cellCount } = Board.instance;

    for (let row = 0; row < cellCount; row++) {
      for (let col = 0; col < cellCount; col++) {
        if (cells[row][col].value) {
          let nextCol = col + 1;
          while (nextCol < cellCount) {
            if (!cells[row][nextCol].value && cells[row][col].value) {
              cells[row][nextCol].value = cells[row][col].value;
              cells[row][col].value = 0;
              nextCol++;
            } else if (cells[row][col].value === cells[row][nextCol].value) {
              cells[row][nextCol].value *= 2;
              cells[row][col].value = 0;
              break;
            } else {
              break;
            }
          }
        }
      }
    }

    Board.drawAllCells();
    Board.pasteNewCell();
  }

  private static moveUp() {
    if (!Board.checkIsBoard(Board.instance)) {
      throw new Error('Экземпляр Board не инициализирован');
    }

    const { cells, cellCount } = Board.instance;

    for (let row = 0; row < cellCount; row++) {
      for (let col = cellCount - 1; col >= 0; col--) {
        if (cells[row][col].value) {
          let nextCol = col - 1;
          while (nextCol >= 0) {
            if (!cells[row][nextCol].value && cells[row][col].value) {
              cells[row][nextCol].value = cells[row][col].value;
              cells[row][col].value = 0;
              nextCol--;
            } else if (cells[row][col].value === cells[row][nextCol].value) {
              cells[row][nextCol].value *= 2;
              cells[row][col].value = 0;
              break;
            } else {
              break;
            }
          }
        }
      }
    }

    Board.drawAllCells();
    Board.pasteNewCell();
  }

  private static moveRight() {
    if (!Board.checkIsBoard(Board.instance)) {
      throw new Error('Экземпляр Board не инициализирован');
    }

    const { cells, cellCount } = Board.instance;

    for (let row = 0; row < cellCount - 1; row++) {
      for (let col = 0; col < cellCount; col++) {
        if (cells[row][col].value) {
          let nextRow = row + 1;
          while (nextRow < cellCount) {
            if (!cells[nextRow][col].value && cells[row][col].value) {
              cells[nextRow][col].value = cells[row][col].value;
              cells[row][col].value = 0;
              nextRow++;
            } else if (cells[nextRow][col].value === cells[row][col].value) {
              cells[nextRow][col].value *= 2;
              cells[row][col].value = 0;
              break;
            } else {
              break;
            }
          }
        }
      }
    }

    Board.drawAllCells();
    Board.pasteNewCell();
  }

  private static moveLeft() {
    if (!Board.checkIsBoard(Board.instance)) {
      throw new Error('Экземпляр Board не инициализирован');
    }

    const { cells, cellCount } = Board.instance;

    for (let row = cellCount - 1; row >= 0; row--) {
      for (let col = 0; col < cellCount; col++) {
        if (cells[row][col].value) {
          let nextRow = row - 1;
          while (nextRow >= 0) {
            if (!cells[nextRow][col].value && cells[row][col].value) {
              cells[nextRow][col].value = cells[row][col].value;
              cells[row][col].value = 0;
              nextRow--;
            } else if (cells[nextRow][col].value === cells[row][col].value) {
              cells[nextRow][col].value *= 2;
              cells[row][col].value = 0;
              break;
            } else {
              break;
            }
          }
        }
      }
    }

    Board.drawAllCells();
    Board.pasteNewCell();
  }
}
