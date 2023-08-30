import p5 from 'p5';

export type Sketch = (width: number, height: number) => (p5: p5) => void;
