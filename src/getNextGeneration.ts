export type Coordinate = readonly [number, number];

export class CoordinateSet {
  data: Set<string>;

  constructor(data: Coordinate[] = []) {
    this.data = new Set(data.map((coordinate) => coordinate.join(',')));
  }

  has(coordinate: Coordinate): boolean {
    return this.data.has(coordinate.join(','));
  }

  add(coordinate: Coordinate) {
    this.data.add(coordinate.join(','));
  }

  delete(coordinate: Coordinate) {
    this.data.delete(coordinate.join(','));
  }

  *[Symbol.iterator](): Generator<Coordinate> {
    for (const element of this.data) {
      const [x, y] = element.split(',').map(Number);
      yield [x, y];
    }
  }
}

class DefaultMap {
  data: Record<string, number> = {};
  defaultValue = 0;

  increment(coordinate: Coordinate) {
    const strCoordinate = coordinate.join(',');
    if (strCoordinate in this.data) {
      this.data[strCoordinate] += 1;
    } else {
      this.data[strCoordinate] = 1;
    }
  }

  [Symbol.iterator]() {
    const dataIterator = Object.entries(this.data)[Symbol.iterator]();
    return {
      next: () => {
        const { done, value } = dataIterator.next();
        if (done) {
          return { done };
        }
        const [strCoordinate, count] = value;
        const [x, y] = strCoordinate.split(',');
        const coordinate = [Number(x), Number(y)];
        return {
          done: false,
          value: [coordinate, count],
        };
      },
    };
  }
}

const getAliveNeighborsCount = (cells: CoordinateSet): DefaultMap => {
  const aliveNeighborsCount = new DefaultMap();
  for (const [x, y] of cells) {
    for (const dx of [-1, 0, 1]) {
      for (const dy of [-1, 0, 1]) {
        if (dx !== 0 || dy !== 0) {
          const coordinate = [x + dx, y + dy] as const;
          aliveNeighborsCount.increment(coordinate);
        }
      }
    }
  }
  return aliveNeighborsCount;
};

const getNextGeneration = (cells: CoordinateSet): CoordinateSet => {
  const aliveNeighborsCount = getAliveNeighborsCount(cells);
  const nextGenCells = new CoordinateSet();
  for (const [key, value] of aliveNeighborsCount) {
    if (cells.has(key)) {
      if ([2, 3].includes(value)) {
        nextGenCells.add(key);
      }
    } else if (value === 3) {
      nextGenCells.add(key);
    }
  }
  return nextGenCells;
};

export default getNextGeneration;
