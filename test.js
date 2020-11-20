const { performance } = require('perf_hooks');
const t0 = performance.now();

var grid =[ 
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 3, 0, 8, 5],
  [0, 0, 1, 0, 2, 0, 0, 0, 0],
  [0, 0, 0, 5, 0, 7, 0, 0, 0],
  [0, 0, 4, 0, 0, 0, 1, 0, 0],
  [0, 9, 0, 0, 0, 0, 0, 0, 0],
  [5, 0, 0, 0, 0, 0, 0, 7, 3],
  [0, 0, 2, 0, 1, 0, 0, 0, 0],
  [0, 0, 0, 0, 4, 0, 0, 0, 9],
];


const solve = (grid) => {

  find = findEmpty(grid);

  if (!find) {
    return true;
  } else {
    let { x, y } = find;
    for (let n = 1; n <= 9; n++) {
      if (possible(grid,n,x,y)) {
        grid[y][x] = n;
        if(solve(grid)) {
          return true;
        } else {
          grid[y][x] = 0;
        }
      }
    }
  }
  return false;
};

const possible = (grid,n,x,y) => {

  for (let i = 0; i < 9; i++) {
    if (grid[y][i] === n  || grid[i][x] === n) {
      return false;
    }
  }

  let x0 = Math.floor(x / 3) * 3;
  let y0 = Math.floor(y / 3) * 3;

  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (grid[y0 + i][x0 + j] === n) {
        return false;
      }
    }
  }
  return true;
};

const findEmpty = (grid) => {

  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {     
      if(grid[i][j] === 0) {
        return({ x: j, y: i })
      }
    }
  }
return false;
};

solve(grid);
console.log(performance.now() - t0);
console.log(grid)