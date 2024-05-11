import { useRef, useEffect, FC } from 'react';
import { Board } from '../lib/board';

export const GameBoard: FC = () => {
  const ref = useRef<HTMLCanvasElement | null>(null);

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

  return <canvas ref={ref} />;
};
