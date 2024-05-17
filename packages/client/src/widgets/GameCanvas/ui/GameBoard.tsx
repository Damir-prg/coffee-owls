import { useRef, useEffect, FC } from 'react';
import { Board } from '../lib/board';
import '../styles/GameBoard.css';

export const GameBoard: FC = () => {
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
        Board.getInstance({ ctx: ctx, size });
        Board.startGame();
      }
    }

    return () => {
      Board.deleteInstance();
    };
  }, []);

  return <canvas ref={ref} className="game__board" />;
};
