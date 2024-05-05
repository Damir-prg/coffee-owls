import { useRef, useEffect, FC } from 'react';
import { Board } from '../lib/board';

export const GameBoard: FC = () => {
  const ref = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (ref.current) {
      const ctx = ref.current.getContext('2d');
      const height = ref.current.parentElement?.offsetHeight ?? 640;

      if (ctx) {
        Board.getInstance({ ctx: ctx, size: height });
        Board.startGame();
      }
    }

    return () => {
      Board.deleteInstance();
    };
  }, []);

  return <canvas ref={ref} />;
};
