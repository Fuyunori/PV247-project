import { Coordinate } from '../getNextGeneration';

export type Game = {
  readonly id: string;
  readonly name: string;
  readonly width: number;
  readonly height: number;
  readonly aliveCells: Coordinate[];
};
