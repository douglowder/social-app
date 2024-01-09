/* eslint-env detox/detox */

import {describe, beforeAll, it} from '@jest/globals'
import {openApp, isVisible} from '../util'

describe('Curate lists', () => {
  beforeAll(async () => {
    await openApp({
      permissions: {notifications: 'YES', medialibrary: 'YES', photos: 'YES'},
    })
  })

  it('App runs', async () => {
    await isVisible('test')
  })
})
