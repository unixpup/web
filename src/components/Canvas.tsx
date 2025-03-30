import { FC } from 'react';

interface CanvasProps {
  width: number;
  height: number;
}

const Canvas: FC<CanvasProps> = ({ width, height }) => {
  return (
    <canvas 
      width={width} 
      height={height}
      style={{ 
        transform: `scale(${typeof window !== 'undefined' ? 1/window.devicePixelRatio : 1})` 
      }}
    />
  );
};

export default Canvas;
