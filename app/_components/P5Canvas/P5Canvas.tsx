'use client';
import useP5Canvas from './hooks/useP5Canvas';
import sketch001 from './sketches/wave-function-collapse';

const P5Canvas = () => {
  const CanvasWrapper = useP5Canvas(sketch001, [800, 800]);
  return CanvasWrapper;
};

export default P5Canvas;
