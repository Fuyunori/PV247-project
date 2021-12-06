import getUniqueName from './getUniqueName';

it('generates string of three words', () => {
  const result = getUniqueName();
  expect(result.split(' ')).toHaveLength(3);
});

it('generates words starting with uppercase', () => {
  const result = getUniqueName();
  result.split(' ').forEach((word) => {
    expect(word[0]).toEqual(word[0].toUpperCase());
  });
});
