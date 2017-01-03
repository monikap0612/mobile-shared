import Immutable from 'seamless-immutable';

export const sort = (predicate) => (arr) => {
  const temp = Immutable.asMutable(arr)
  const sorted = temp.sort(predicate)

  return Immutable.from(sorted);
}
