export interface BuglyUserInfo {
  newUserId: string
  registerTime: string
  logoUrl: string
  wechat: string
  email: string
  phone: string
  nickname: string
  sex: string // 0 男 1 女
  city: string
  workingYears: string
  position: string
  qqNickName: string
  address: string
  realname: string
  status: string
  validated: number
  signedAgreement: number
  userId: string //'3963320D3C71A2FF60A4DA8BFCA557D1'
  isSuper: number
}

export interface BuglyAppInfo {
  appName: string
  appId: string
  pid: number //1
  logoUrl: string //'2c06cba9-7d27-4f1c-8b0d-b932c33deaf3'
  type: number //15
  isSdkApp: number // 0
  appKey: string //'19bed9d3-b305-43c7-8bc0-cff3b3adae34'
  appFrom: number // 0
  isGray: boolean //true
  createTime: string //'2022-11-23 23:00:00'
  userdataEnable: number //1
  ownerId: string // '81067'
  memberCount: number //12
  enableUserAuit: number //0
  showAuit: number //0
  betaEnable: number //0
}

export interface BuglyAppDetail {
  versionList: [
    {
      name: string
    }
  ]
}

export interface BuglyAppCrashDateInfo {
  appId: string
  platformId: string
  date: string
  type: string
  crashnum: number
  crashUser: number
  accessNum: number
  accessUser: number
}
