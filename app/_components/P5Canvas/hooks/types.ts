import { Sketch } from '../types';

export type UseDraw = (
  sketch: Sketch,
  [sizeX, sizeY]: [number, number]
) => React.ReactNode;
