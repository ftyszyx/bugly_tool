import { BuglyAppInfo, BuglyUserInfo } from '@common/entitys/bugly.entity'
import { create } from '@renderer/libs/state'
export interface BuglyModel {
  bugly_session: string
  setSession: (session: string) => void
  userinfo: BuglyUserInfo | null
  applist: BuglyAppInfo[] | null
  setUserinfo: (userinfo: BuglyUserInfo) => void
  setAppList: (userinfo: BuglyAppInfo[]) => void
}

export const use_bugly = create<BuglyModel>((set, get) => {
  return {
    bugly_session: '',
    setSession(session) {
      set((state) => {
        // setCookie('bugly-session', session, 365)
        return { ...state, bugly_session: session }
      })
    },
    userinfo: null,
    applist: null,
    setUserinfo(userinfo) {
      set((state) => {
        return { ...state, userinfo }
      })
    },
    setAppList(applist) {
      set((state) => {
        return { ...state, applist }
      })
    }
  }
})
