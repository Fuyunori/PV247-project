import Generation from './Generation';

type Configuration = {
  readonly id: string;
  readonly name: string;
  readonly authorName: string;
  readonly width: number;
  readonly height: number;
  readonly createdAt: Date;
  readonly initialGeneration: Generation;
};

export default Configuration;
