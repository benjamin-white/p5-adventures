class Cell {
  collapsed: boolean;
  options: number[] = [];

  constructor(value: number[] | number) {
    this.collapsed = false;

    if (Array.isArray(value)) {
      this.options = value;
    } else {
      for (let i = 0; i < value; i++) {
        this.options[i] = i;
      }
    }
  }
}

export default Cell;
