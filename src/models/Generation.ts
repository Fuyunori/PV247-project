import { Coordinate } from '../utils/getNextGeneration';

type Generation = {
  readonly aliveCells: Coordinate[];
};

export default Generation;
