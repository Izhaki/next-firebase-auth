import withAuthUserTokenSSRModule from 'src/server/withAuthUserTokenSSR'
import initFirebaseAdminSDK from 'src/server/initFirebaseAdminSDK'

export { default as setAuthCookies } from 'src/server/setAuthCookies'
export { default as unsetAuthCookies } from 'src/server/unsetAuthCookies'
export { verifyIdToken } from 'src/server/firebaseAdmin'

export const withAuthUserTokenSSR = (options) =>
  withAuthUserTokenSSRModule(options, { useToken: true })

export const withAuthUserSSR = (options) =>
  withAuthUserTokenSSRModule(options, { useToken: false })

export const getFirebaseAdmin = () => initFirebaseAdminSDK()
