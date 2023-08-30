import { useEffect, useRef } from 'react';
import p5 from 'p5';
import { UseDraw } from './types';

const useDraw: UseDraw = (sketch, [sizeX, sizeY]) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const drawScript = sketch(sizeX, sizeY);
    const p5Instance = new p5(drawScript, ref.current!);
    return p5Instance.remove;
  }, [sketch, sizeX, sizeY]);

  return <div ref={ref} style={{ backgroundColor: '#fff' }} />;
};

export default useDraw;
