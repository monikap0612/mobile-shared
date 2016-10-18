import actions from '../src/actions'
import { assertActionType } from './helpers/assert-action-type'

describe('Actions', () => {
  describe('Assets', () => {
    const subject = actions.assets

    it('resetAssets', function () {
      assertActionType(subject.resetAssets(), 'assets.ASSETS_RESET')
    })
  })
})
