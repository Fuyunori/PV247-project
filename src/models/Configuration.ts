import Generation from './Generation';

export type Configuration = {
  readonly width: number;
  readonly height: number;
  readonly initialGeneration: Generation;
};

export type StoredConfiguration = {
  readonly name: string;
  readonly authorName: string;
  readonly createdAt: Date;
  readonly width: number;
  readonly height: number;
  readonly initialGeneration: string;
};

export type ParsedConfiguration = {
  readonly id: string;
  readonly name: string;
  readonly authorName: string;
  readonly createdAt: Date;
  readonly width: number;
  readonly height: number;
  readonly initialGeneration: Generation;
};

export type ConfigurationInput = {
  readonly name: string;
  readonly authorName: string;
  readonly createdAt: Date;
  readonly width: number;
  readonly height: number;
  readonly initialGeneration: string;
};
