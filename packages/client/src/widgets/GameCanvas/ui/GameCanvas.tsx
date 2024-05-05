import { useRef } from 'react';

export const GameCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  return <canvas width={640} height={640} ref={canvasRef} />;
};
