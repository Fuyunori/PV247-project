import getNextGeneration, { CoordinateSet } from './getNextGeneration';

const life = (cells: CoordinateSet, n: number) => {
  for (let i = 0; i < n; i++) {
    cells = getNextGeneration(cells);
  }
  return cells;
};

it('simulates life of no cells', () => {
  expect(life(new CoordinateSet(), 3)).toEqual(new CoordinateSet());
});

it('simulates life of cell that dies of loneliness', () => {
  expect(life(new CoordinateSet([[0, 0]]), 1)).toEqual(new CoordinateSet());
});

it('simulates life of block that does not change', () => {
  const block = new CoordinateSet([
    [0, 0],
    [1, 1],
    [0, 1],
    [1, 0],
  ]);

  for (let i = 0; i < 20; i++) {
    expect(life(block, i).data).toEqual(block.data);
  }
});

it('simulates life of periodic shape', () => {
  const blinker0 = new CoordinateSet([
    [0, -1],
    [0, 0],
    [0, 1],
  ]);
  const blinker1 = new CoordinateSet([
    [-1, 0],
    [0, 0],
    [1, 0],
  ]);

  for (let i = 0; i < 20; i++) {
    const expected = i % 2 === 0 ? blinker0 : blinker1;
    const result = life(blinker0, i);
    expect(result.data).toEqual(expected.data);
  }
});

it('simulates life of glider', () => {
  const glider = new CoordinateSet([
    [-1, 0],
    [0, 0],
    [1, 0],
    [1, -1],
    [0, -2],
  ]);

  for (let i = 0; i < 40; i += 4) {
    const expected = new CoordinateSet([...glider].map(([x, y]) => [x + Math.floor(i / 4), y + Math.floor(i / 4)]));
    const result = life(glider, i);
    expect(result.data).toEqual(expected.data);
  }
});
