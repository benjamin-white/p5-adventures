// import type P5 from 'p5';
import Tile from './tile';
import Cell from './cell';
import sketchParams from './config/001';

const { DIMENSION, TILES } = sketchParams;
let tiles = [];
const tileImages = [];
let grid = [];

const sketch001 = (width, height) => (p5) => {
  p5.preload = () => {
    TILES.SOURCE.forEach((src, i) => (tileImages[i] = p5.loadImage(src)));
  };

  const removeDuplicatedTiles = (tiles) => {
    const uniqueTilesMap = {};
    for (const tile of tiles) {
      const key = tile.edges.join(','); // ex: "ABB,BCB,BBA,AAA"
      uniqueTilesMap[key] = tile;
    }
    return Object.values(uniqueTilesMap);
  };

  p5.setup = () => {
    p5.createCanvas(width, height);

    TILES.SOCKET_RULES.forEach((edgeRules, index) => {
      tiles[index] = new Tile(tileImages[index], edgeRules, index, p5);
      // tiles[index].index = index;
    });

    const initialTileCount = tiles.length;
    for (let i = 0; i < initialTileCount; i++) {
      let tempTiles = [];
      for (let j = 0; j < 4; j++) {
        tempTiles.push(tiles[i].rotate(j));
      }
      tempTiles = removeDuplicatedTiles(tempTiles);
      tiles = tiles.concat(tempTiles);
    }

    // Generate the adjacency rules based on edges
    for (let i = 0; i < tiles.length; i++) {
      const tile = tiles[i];
      tile.analyze(tiles);
    }

    startOver();
  };

  const startOver = () => {
    // Create cell for each spot on the grid
    for (let i = 0; i < DIMENSION * DIMENSION; i++) {
      grid[i] = new Cell(tiles.length);
    }
  };

  const checkValid = (arr, valid) => {
    for (let i = arr.length - 1; i >= 0; i--) {
      let element = arr[i];
      if (!valid.includes(element)) {
        arr.splice(i, 1);
      }
    }
  };

  p5.draw = () => {
    // p5.background(0);

    const w = width / DIMENSION;
    const h = height / DIMENSION;
    for (let j = 0; j < DIMENSION; j++) {
      for (let i = 0; i < DIMENSION; i++) {
        let cell = grid[i + j * DIMENSION];
        if (cell.collapsed) {
          let index = cell.options[0];
          p5.image(tiles[index].img, i * w, j * h, w, h);
        } else {
          p5.noFill();
          // p5.stroke(51);
          p5.rect(i * w, j * h, w, h);
        }
      }
    }

    // Pick cell with least entropy
    let gridCopy = grid.slice();
    gridCopy = gridCopy.filter((a) => !a.collapsed);

    if (gridCopy.length == 0) {
      return;
    }

    gridCopy.sort((a, b) => {
      return a.options.length - b.options.length;
    });

    let len = gridCopy[0].options.length;
    let stopIndex = 0;
    for (let i = 1; i < gridCopy.length; i++) {
      if (gridCopy[i].options.length > len) {
        stopIndex = i;
        break;
      }
    }

    if (stopIndex > 0) gridCopy.splice(stopIndex);
    const cell = p5.random(gridCopy);
    cell.collapsed = true;
    const pick = p5.random(cell.options);
    if (pick === undefined) {
      startOver();
      return;
    }
    cell.options = [pick];

    const nextGrid = [];
    for (let j = 0; j < DIMENSION; j++) {
      for (let i = 0; i < DIMENSION; i++) {
        let index = i + j * DIMENSION;
        if (grid[index].collapsed) {
          nextGrid[index] = grid[index];
        } else {
          let options = new Array(tiles.length).fill(0).map((x, i) => i);
          // Look up
          if (j > 0) {
            let up = grid[i + (j - 1) * DIMENSION];
            let validOptions = [];
            for (let option of up.options) {
              let valid = tiles[option].down;
              validOptions = validOptions.concat(valid);
            }
            checkValid(options, validOptions);
          }
          // Look right
          if (i < DIMENSION - 1) {
            let right = grid[i + 1 + j * DIMENSION];
            let validOptions = [];
            for (let option of right.options) {
              let valid = tiles[option].left;
              validOptions = validOptions.concat(valid);
            }
            checkValid(options, validOptions);
          }
          // Look down
          if (j < DIMENSION - 1) {
            let down = grid[i + (j + 1) * DIMENSION];
            let validOptions = [];
            for (let option of down.options) {
              let valid = tiles[option].up;
              validOptions = validOptions.concat(valid);
            }
            checkValid(options, validOptions);
          }
          // Look left
          if (i > 0) {
            let left = grid[i - 1 + j * DIMENSION];
            let validOptions = [];
            for (let option of left.options) {
              let valid = tiles[option].right;
              validOptions = validOptions.concat(valid);
            }
            checkValid(options, validOptions);
          }

          nextGrid[index] = new Cell(options);
        }
      }
    }

    grid = nextGrid;
  };
};

export default sketch001;
