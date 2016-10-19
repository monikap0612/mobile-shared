import { get } from 'lodash/object'
import { isEqual } from 'lodash/lang'

export default function checkEqual(c, n, path) {
  return isEqual(get(c, path), get(n, path))
}
