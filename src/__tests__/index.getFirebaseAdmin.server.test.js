/**
 * @jest-environment node
 */

import * as admin from 'firebase-admin'
import createMockConfig from '../testHelpers/createMockConfig'
import { setConfig } from '../config'

jest.mock('firebase-admin')
jest.mock('src/config')

beforeEach(() => {
  const mockConfig = createMockConfig({ clientSide: false })
  setConfig(mockConfig)

  admin.credential.cert.mockImplementation((obj) => ({
    ...obj,
    _mockFirebaseCert: true,
  }))
  admin.apps = []
})

afterEach(() => {
  jest.clearAllMocks()
})

describe('server/index: getFirebaseAdmin', () => {
  it('exports getFirebaseAdmin', () => {
    expect.assertions(1)
    const indexServer = require('src/server')
    expect(indexServer.getFirebaseAdmin).toBeDefined()
  })

  it('getFirebaseAdmin returns admin', () => {
    expect.assertions(1)
    const indexServer = require('src/server')
    const response = indexServer.getFirebaseAdmin()
    expect(response).toEqual(admin)
  })
})
