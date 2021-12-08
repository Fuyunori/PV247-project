import Generation from '../models/Generation';

const generationsAreEqual = (a: Generation, b: Generation): boolean => {
  if (a.length !== b.length) {
    return false;
  }
  return a.every((aCoord) => b.find((bCoord) => bCoord[0] === aCoord[0] && bCoord[1] === aCoord[1]));
};

export default generationsAreEqual;
