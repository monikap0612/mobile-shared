import Immutable from 'seamless-immutable';

export const sort = (arr, compare) => {
  const temp = Immutable.asMutable(arr)
  const sorted = temp.sort(compare)

  return Immutable.from(sorted);
}
