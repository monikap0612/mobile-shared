const buildType = (action) => `WIFI/${action}`

export default {
  POWER: buildType('POWER/TAP'),
  POWER_SUCCESS: buildType('POWER/SUCCESS'),
  POWER_FAILURE: buildType('POWER/FAILURE'),
  NOT_SUPPORTED: buildType('NOT_SUPPORTED'),
}
