// react-router/RouterContext.js
import { RouterStoreData } from 'kl_router'
import { createContext } from 'react'
import { createBrowserHistory } from './history'
const history = createBrowserHistory({ debug: false })
const routerContext = createContext<RouterStoreData>({
  debug: false,
  history
})
routerContext.displayName = 'Router'
export default routerContext
