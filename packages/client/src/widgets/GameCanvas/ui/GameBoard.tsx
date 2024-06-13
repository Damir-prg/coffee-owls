import { useRef, useEffect, FC, useContext } from 'react';
import { Board } from '../lib/board';
import '../styles/GameBoard.css';
import { BOARD_CONTROLS } from 'widgets/GameCanvas/types/boardTypes';
import { GameContextInstance } from 'entities/GameContext';
import { useFinishGame } from '../hooks/useFinishGame';

export const GameBoard: FC = () => {
  const { gameMode } = useContext(GameContextInstance);
  const [finishGame] = useFinishGame(gameMode);
  const ref = useRef<HTMLCanvasElement | null>(null);

  const handleFullscreen = async (event: KeyboardEvent) => {
    if (event.code !== 'Enter') {
      return;
    }
    if (!ref || !(ref.current instanceof HTMLCanvasElement)) {
      return;
    }
    if (!document.fullscreenElement) {
      await ref.current.requestFullscreen();
      return;
    }
    await document.exitFullscreen();
  };

  useEffect(() => {
    document.addEventListener('keyup', handleFullscreen);
    return () => {
      document.removeEventListener('keyup', handleFullscreen);
    };
  }, []);

  useEffect(() => {
    if (ref.current) {
      const ctx = ref.current.getContext('2d');
      let size = 640;

      if (ref.current.parentElement) {
        const { offsetHeight, offsetWidth } = ref.current.parentElement;

        size = Math.min(offsetHeight, offsetWidth);
      }

      if (ctx) {
        Board.getInstance({ ctx: ctx, size, controls: BOARD_CONTROLS });
        Board.startGame();
      }
    }

    return () => {
      finishGame();
      Board.deleteInstance();
    };
  }, []);

  return <canvas ref={ref} className="game__board" />;
};
