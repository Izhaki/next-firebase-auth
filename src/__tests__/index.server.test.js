import setAuthCookies from 'src/server/setAuthCookies'
import unsetAuthCookies from 'src/server/unsetAuthCookies'
import withAuthUserTokenSSR from 'src/server/withAuthUserTokenSSR'
import initFirebaseAdminSDK from 'src/server/initFirebaseAdminSDK'
import { verifyIdToken } from 'src/server/firebaseAdmin'

jest.mock('src/index')
jest.mock('src/server/setAuthCookies')
jest.mock('src/server/unsetAuthCookies')
jest.mock('src/server/withAuthUserTokenSSR')
jest.mock('src/server/initFirebaseAdminSDK')
jest.mock('src/server/firebaseAdmin')

afterEach(() => {
  jest.clearAllMocks()
})

describe('server/index: withAuthUserSSR', () => {
  it('exports withAuthUserSSR', () => {
    expect.assertions(2)
    const indexServer = require('src/server')
    expect(indexServer.withAuthUserSSR).toBeDefined()
    expect(indexServer.withAuthUserSSR).toEqual(expect.any(Function))
  })

  it('calls the withAuthUserTokenSSR module with useToken=false', () => {
    expect.assertions(1)
    const indexServer = require('src/server')
    indexServer.withAuthUserSSR({ some: 'options' })
    expect(withAuthUserTokenSSR).toHaveBeenCalledWith(
      { some: 'options' },
      { useToken: false }
    )
  })
})

describe('server/index: withAuthUserTokenSSR', () => {
  it('exports withAuthUserTokenSSR', () => {
    expect.assertions(2)
    const indexServer = require('src/server')
    expect(indexServer.withAuthUserTokenSSR).toBeDefined()
    expect(indexServer.withAuthUserTokenSSR).toEqual(expect.any(Function))
  })

  it('calls the withAuthUserTokenSSR module with useToken=true', () => {
    expect.assertions(1)
    const indexServer = require('src/server')
    indexServer.withAuthUserTokenSSR({ some: 'options' })
    expect(withAuthUserTokenSSR).toHaveBeenCalledWith(
      { some: 'options' },
      { useToken: true }
    )
  })
})

describe('server/index: setAuthCookies', () => {
  it('exports setAuthCookies', () => {
    expect.assertions(2)
    const indexServer = require('src/server')
    expect(indexServer.setAuthCookies).toBeDefined()
    expect(indexServer.setAuthCookies).toEqual(expect.any(Function))
  })

  it('exports the expected module', () => {
    expect.assertions(1)
    const indexServer = require('src/server')
    expect(indexServer.setAuthCookies).toEqual(setAuthCookies)
  })
})

describe('server/index: unsetAuthCookies', () => {
  it('exports unsetAuthCookies', () => {
    expect.assertions(2)
    const indexServer = require('src/server')
    expect(indexServer.unsetAuthCookies).toBeDefined()
    expect(indexServer.unsetAuthCookies).toEqual(expect.any(Function))
  })

  it('exports the expected module', () => {
    expect.assertions(1)
    const indexServer = require('src/server')
    expect(indexServer.unsetAuthCookies).toEqual(unsetAuthCookies)
  })
})

describe('server/index: verifyIdToken', () => {
  it('exports verifyIdToken', () => {
    expect.assertions(2)
    const indexServer = require('src/server')
    expect(indexServer.verifyIdToken).toBeDefined()
    expect(indexServer.verifyIdToken).toEqual(expect.any(Function))
  })

  it('exports the expected module', () => {
    expect.assertions(1)
    const indexServer = require('src/server')
    expect(indexServer.verifyIdToken).toEqual(verifyIdToken)
  })
})
