import { setConfig } from 'src/config'
import { setDebugEnabled } from 'src/logDebug'
import initFirebaseClientSDK from 'src/initFirebaseClientSDK'
import isClientSide from 'src/isClientSide'

jest.mock('src/config')
jest.mock('src/logDebug')
jest.mock('src/initFirebaseClientSDK')
jest.mock('src/isClientSide')

beforeEach(() => {
  isClientSide.mockReturnValue(true)
})

afterEach(() => {
  jest.clearAllMocks()
})

describe('index.js: init', () => {
  it('exports init', () => {
    expect.assertions(2)
    const index = require('src/index')
    expect(index.init).toBeDefined()
    expect(index.init).toEqual(expect.any(Function))
  })

  it('calls setDebugEnabled with true if config.debug is true', () => {
    expect.assertions(1)
    const index = require('src/index')
    index.init({ debug: true })
    expect(setDebugEnabled).toHaveBeenCalledWith(true)
  })

  it('calls setDebugEnabled with false if config.debug is truthy but non-true', () => {
    expect.assertions(1)
    const index = require('src/index')
    index.init({ debug: 'yes' })
    expect(setDebugEnabled).toHaveBeenCalledWith(false)
  })

  it('calls setDebugEnabled with false if config.debug is false', () => {
    expect.assertions(1)
    const index = require('src/index')
    index.init({ debug: false })
    expect(setDebugEnabled).toHaveBeenCalledWith(false)
  })

  it('calls setConfig with the provided config', () => {
    expect.assertions(1)
    const index = require('src/index')
    index.init({ some: 'config' })
    expect(setConfig).toHaveBeenCalledWith({ some: 'config' })
  })

  it('calls initFirebaseClientSDK if on the client side', () => {
    expect.assertions(1)
    isClientSide.mockReturnValue(true)
    const index = require('src/index')
    index.init()
    expect(initFirebaseClientSDK).toHaveBeenCalled()
  })

  it('does not call initFirebaseClientSDK if on the server side', () => {
    expect.assertions(1)
    isClientSide.mockReturnValue(false)
    const index = require('src/index')
    index.init()
    expect(initFirebaseClientSDK).not.toHaveBeenCalled()
  })
})

describe('index.js: withAuthUser', () => {
  it('exports withAuthUser', () => {
    expect.assertions(2)
    const index = require('src/index')
    expect(index.withAuthUser).toBeDefined()
    expect(index.withAuthUser).toEqual(expect.any(Function))
  })
})

describe('index.js: useAuthUser', () => {
  it('exports useAuthUser', () => {
    expect.assertions(2)
    const index = require('src/index')
    expect(index.useAuthUser).toBeDefined()
    expect(index.useAuthUser).toEqual(expect.any(Function))
  })
})

describe('index.js: AuthAction', () => {
  it('defines the expected constants', () => {
    expect.assertions(1)
    const index = require('src/index')
    expect(index.AuthAction).toEqual({
      RENDER: 'render',
      SHOW_LOADER: 'showLoader',
      RETURN_NULL: 'returnNull',
      REDIRECT_TO_LOGIN: 'redirectToLogin',
      REDIRECT_TO_APP: 'redirectToApp',
    })
  })
})
