import generationsAreEqual from './generationsAreEqual';
import Generation from '../models/Generation';

it('returns true when both generations are empty', () => {
  const genA: Generation = [];
  const genB: Generation = [];
  expect(generationsAreEqual(genA, genB)).toBe(true);
});

it('returns true when the generations contain the same coordinates in the same order', () => {
  const genA: Generation = [
    [1, 2],
    [5, 6],
  ];
  const genB: Generation = [
    [1, 2],
    [5, 6],
  ];
  expect(generationsAreEqual(genA, genB)).toBe(true);
});

it('returns true when the generations contain the same coordinates in different order', () => {
  const genA: Generation = [
    [1, 2],
    [5, 6],
  ];
  const genB: Generation = [
    [5, 6],
    [1, 2],
  ];
  expect(generationsAreEqual(genA, genB)).toBe(true);
});

it('returns false when one generation contains more coordinates than the other', () => {
  const genA: Generation = [[1, 2]];
  const genB: Generation = [
    [1, 2],
    [3, 4],
  ];
  expect(generationsAreEqual(genA, genB)).toBe(false);
});

it('returns false when the generations are different', () => {
  const genA: Generation = [
    [1, 2],
    [5, 6],
  ];
  const genB: Generation = [
    [1, 2],
    [3, 4],
  ];
  expect(generationsAreEqual(genA, genB)).toBe(false);
});
