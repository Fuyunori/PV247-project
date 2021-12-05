import { adjectives, animals, colors, uniqueNamesGenerator } from 'unique-names-generator';

const getUniqueName = () =>
  uniqueNamesGenerator({
    dictionaries: [adjectives, colors, animals],
    separator: ' ',
    style: 'capital',
  }); // Red Big Donkey

export default getUniqueName;
