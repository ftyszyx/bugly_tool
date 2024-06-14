import { create } from '@renderer/libs/state'
import { MyFetchGet } from '@renderer/libs/tools/fetch'
export interface BuglyModel {
  bugly_session: string
  setSession: (session: string) => void
  userinfo: BuglyUserInfo | null
  applist: BuglyAppInfo[] | null
  initBugly: () => Promise<void>
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
    async initBugly() {
      const bugly_helper = BuglyHelper.instance()
      const userinfo = await bugly_helper.getUserInfo()
      console.log('userinfo', userinfo)
    }
  }
})

class BuglyHelper {
  static _instance: BuglyHelper | null = null
  fsn_arr: string[] = []
  constructor() {
    for (let i = 0; i < 256; i++) {
      this.fsn_arr.push((i + 256).toString(16).substring(1))
    }
  }

  static instance() {
    if (BuglyHelper._instance === null) {
      BuglyHelper._instance = new BuglyHelper()
    }
    return BuglyHelper._instance
  }

  get_fsn() {
    const bytes = new Uint8Array(16)
    self.crypto.getRandomValues(bytes) //uint8array
    bytes[6] = (15 & bytes[6]) | 64
    bytes[8] = (63 & bytes[8]) | 128
    return (
      this.fsn_arr[bytes[0]] +
      this.fsn_arr[bytes[1]] +
      this.fsn_arr[bytes[2]] +
      this.fsn_arr[bytes[3]] +
      '-' +
      this.fsn_arr[bytes[4]] +
      this.fsn_arr[bytes[5]] +
      '-' +
      this.fsn_arr[bytes[6]] +
      this.fsn_arr[bytes[7]] +
      '-' +
      this.fsn_arr[bytes[8]] +
      this.fsn_arr[bytes[9]] +
      '-' +
      this.fsn_arr[bytes[10]] +
      this.fsn_arr[bytes[11]] +
      this.fsn_arr[bytes[12]] +
      this.fsn_arr[bytes[13]] +
      this.fsn_arr[bytes[14]] +
      this.fsn_arr[bytes[15]]
    ).toLowerCase()
  }

  async getUserInfo() {
    const url = new URL('https://bugly.qq.com/v4/api/old/info')
    url.searchParams.append('fsn', this.get_fsn())
    const url_str = url.toString()
    return await MyFetchGet<BuglyUserInfo>(url_str)
  }

  async getAppList(user_id: string) {
    const url = new URL('https://bugly.qq.com/v4/api/old/app-list')
    url.searchParams.append('fsn', this.get_fsn())
    url.searchParams.append('userId', user_id)
    const url_str = url.toString()
    return await MyFetchGet<BuglyAppInfo[]>(url_str)
  }
}
