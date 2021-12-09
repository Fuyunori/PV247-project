import Generation from './Generation';

export type Configuration = {
  boardSize: number;
  initialGeneration: Generation;
};

export type StoredConfiguration = {
  name: string;
  authorName: string;
  createdAt: Date;
  boardSize: number;
  initialGeneration: string;
};

export type ParsedConfiguration = {
  id: string;
  name: string;
  authorName: string;
  createdAt: Date;
  boardSize: number;
  initialGeneration: Generation;
};

export type ConfigurationInput = {
  name: string;
  authorName: string;
  createdAt: Date;
  boardSize: number;
  initialGeneration: string;
};
