import { IBoardProps, TUnionCells } from '../types/boardTypes';
import { ICellProps } from '../types/cellTypes';
import { Cell } from './cell';

export class Board {
  /**
   * Экземпляр Board
   */
  private static instance: Board | null = null;
  /**
   * Ссылка на canvas
   */
  private ctx: CanvasRenderingContext2D;
  /**
   * Количество ячеек в одной строке.
   */
  private cellCount = 4;
  /**
   * Ширина ячейки
   */
  private cellWidth = 0;
  /**
   * Отступ между ячейками
   */
  private boardGap = 10;
  /**
   *  Отступ от правой и нижней границы доски
   */
  private boardSizeCorrector = this.boardGap + Math.floor(this.boardGap / 5);
  /**
   * Матрица ячеек
   */
  private cells: Array<Array<Cell>> = [];
  /**
   * Клавиши управления
   */
  private controls: IBoardProps['controls'];
  /**
   * Callback для передачи функции подсчета очков
   */
  private static scoreHandler: (points: number) => void | null;
  /**
   * Функция для установки callback'а для передачи функции подсчета очков
   *
   * @param {(points: number) => void} scoreHandler - Функция, которая будет вызываться для подсчета очков
   */
  public static setScoreHandler(scoreHandler: (points: number) => void) {
    Board.scoreHandler = scoreHandler;
  }
  /**
   * Callback для передачи функции подсчета очков
   */
  private static gameOverHandler: () => void | null;
  /**
   * Функция для установки callback'а для передачи функции подсчета очков
   *
   * @param {() => void} gameOverHandler - Функция, которая будет вызываться при завершении игры
   */
  public static setGameOverHandler(gameOverHandler: () => void) {
    Board.gameOverHandler = gameOverHandler;
  }

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
   * Проверяет, завершена ли игра путем проверки наличия пустых ячеек и соседних ячеек с одинаковыми значениями.
   */
  private static checkIsGameOver(): boolean {
    if (!Board.checkIsBoard(Board.instance)) {
      throw new Error('Board is not created');
    }

    const { cells, cellCount } = Board.instance;

    // Проверяем наличие пустых ячеек
    const hasEmptyCells = cells.flat().some(cell => !cell.value);
    if (hasEmptyCells) {
      return false;
    }

    // Проверяем наличие рядом стоящих ячеек с одинаковыми значениями
    for (let row = 0; row < cellCount; row++) {
      for (let col = 0; col < cellCount - 1; col++) {
        if (cells[row][col].value === cells[row][col + 1].value) {
          return false; // Игра не закончена, есть рядом стоящие ячейки с одинаковыми значениями
        }
      }
    }

    for (let col = 0; col < cellCount; col++) {
      for (let row = 0; row < cellCount - 1; row++) {
        if (cells[row][col].value === cells[row + 1][col].value) {
          return false; // Игра не закончена, есть рядом стоящие ячейки с одинаковыми значениями
        }
      }
    }

    return true; // Игра закончена, нет пустых ячеек и нет рядом стоящих ячеек с одинаковыми значениями
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

    if (Board.checkIsGameOver()) {
      if (Board?.gameOverHandler) {
        Board.gameOverHandler();
      } else {
        console.log('Игра закончена, ходов больше нет :(');
      }

      return;
    }

    if (!emptyCells.length) {
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

  /**
   * Обрабатывает нажатие клавиш клавиатуры, проверяя экземпляр доски,
   * определяя направление на основе нажатой клавиши и перемещая доску соответственно.
   *
   * @param {KeyboardEvent} event - Нажатие клавиши для обработки
   */
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

  /**
   *  Объединение ячеек в зависимости от переданного направления
   * @param {string} direction - Направление движения `up`, `down`, `left`, `right`
   * @param {number} row - Строка ячейки, если направление `up` или `down`
   * @param {number} col - Столбец ячейки, если направление `left` или `right`
   */
  private static unionCells(params: TUnionCells) {
    if (!Board.checkIsBoard(Board.instance)) {
      throw new Error('Board instance is not initialized');
    }

    const { cells, cellCount } = Board.instance;
    const { direction } = params;

    let paramIndex = 0;
    if (direction === 'up' || direction === 'down') {
      paramIndex = params.row;
    } else if (direction === 'left' || direction === 'right') {
      paramIndex = params.col;
    }

    const isRowDirection = direction === 'down' || direction === 'up';
    const isIncreasingDirection = direction === 'down' || direction === 'right';
    const startIndex = isIncreasingDirection ? cellCount - 1 : 0;
    const endIndex = isIncreasingDirection ? -1 : cellCount;
    const increment = isIncreasingDirection ? -1 : 1;

    let currentIndex = startIndex;
    for (let index = startIndex; index !== endIndex; index += increment) {
      if (cells[isRowDirection ? paramIndex : index][isRowDirection ? index : paramIndex].value !== 0) {
        cells[isRowDirection ? paramIndex : currentIndex][isRowDirection ? currentIndex : paramIndex].value =
          cells[isRowDirection ? paramIndex : index][isRowDirection ? index : paramIndex].value;
        if (index !== currentIndex) {
          cells[isRowDirection ? paramIndex : index][isRowDirection ? index : paramIndex].value = 0;
        }
        currentIndex += increment;
      }
    }
  }

  /**
   * Перемещает ячейки вниз, объединяя одинаковые значения.
   */
  private static moveDown() {
    if (!Board.checkIsBoard(Board.instance)) {
      throw new Error('Экземпляр Board не инициализирован');
    }

    const { cells, cellCount } = Board.instance;

    for (let row = 0; row < cellCount; row++) {
      Board.unionCells({ direction: 'down', row });

      // Объединение ячеек с одинаковым значением
      for (let col = cellCount - 1; col > 0; col--) {
        if (cells[row][col].value === cells[row][col - 1].value) {
          cells[row][col].value *= 2;
          Board?.scoreHandler(cells[row][col].value);
          cells[row][col - 1].value = 0;
        }
      }

      Board.unionCells({ direction: 'down', row });
    }

    Board.drawAllCells();
    Board.pasteNewCell();
  }

  /**
   * Перемещает ячейки вверх, объединяя одинаковые значения.
   */
  private static moveUp() {
    if (!Board.checkIsBoard(Board.instance)) {
      throw new Error('Экземпляр Board не инициализирован');
    }

    const { cells, cellCount } = Board.instance;

    for (let row = cellCount - 1; row >= 0; row--) {
      Board.unionCells({ direction: 'up', row });

      for (let col = 0; col < cellCount - 1; col++) {
        if (cells[row][col].value === cells[row][col + 1].value) {
          cells[row][col].value *= 2;
          Board?.scoreHandler(cells[row][col].value);
          cells[row][col + 1].value = 0;
        }
      }

      Board.unionCells({ direction: 'up', row });
    }

    Board.drawAllCells();
    Board.pasteNewCell();
  }

  /**
   * Перемещает ячейки вправо, объединяя одинаковые значения.
   */
  private static moveRight() {
    if (!Board.checkIsBoard(Board.instance)) {
      throw new Error('Экземпляр Board не инициализирован');
    }

    const { cells, cellCount } = Board.instance;

    for (let col = 0; col < cellCount; col++) {
      Board.unionCells({ direction: 'right', col });

      for (let row = cellCount - 1; row > 0; row--) {
        if (cells[row][col].value === cells[row - 1][col].value) {
          cells[row][col].value *= 2;
          Board?.scoreHandler(cells[row][col].value);
          cells[row - 1][col].value = 0;
        }
      }

      Board.unionCells({ direction: 'right', col });
    }

    Board.drawAllCells();
    Board.pasteNewCell();
  }

  /**
   * Перемещает ячейки влево, объединяя одинаковые значения.
   */
  private static moveLeft() {
    if (!Board.checkIsBoard(Board.instance)) {
      throw new Error('Экземпляр Board не инициализирован');
    }

    const { cells, cellCount } = Board.instance;

    for (let col = cellCount - 1; col >= 0; col--) {
      Board.unionCells({ direction: 'left', col });

      for (let row = 0; row < cellCount - 1; row++) {
        if (cells[row][col].value === cells[row + 1][col].value) {
          cells[row][col].value *= 2;
          Board?.scoreHandler(cells[row][col].value);
          cells[row + 1][col].value = 0;
        }
      }

      Board.unionCells({ direction: 'left', col });
    }

    Board.drawAllCells();
    Board.pasteNewCell();
  }
}
