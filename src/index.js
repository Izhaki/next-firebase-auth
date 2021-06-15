import { setConfig } from 'src/config'
import initFirebaseClientSDK from 'src/initFirebaseClientSDK'
import { setDebugEnabled } from 'src/logDebug'
import isClientSide from 'src/isClientSide'

export { default as AuthAction } from 'src/AuthAction'
export { default as useAuthUser } from 'src/useAuthUser'
export { default as withAuthUser } from 'src/withAuthUser'

export const init = (config = {}) => {
  setDebugEnabled(config.debug === true)

  setConfig(config)

  // On the client side, initialize the Firebase JS SDK.
  if (isClientSide()) {
    initFirebaseClientSDK()
  }
}
