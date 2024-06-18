//msg defines
export enum WebToMainMsg {
  OpenBuglyLogin = 'open_bugly_login',
  CleanToken = 'clean_token',
  InitBugly = 'init_bugly',
  GetAppVersions = 'app_versions'
}

export enum MainToWebMsg {
  OnGetBuglySession = 'get_bugly_session',
  OnGetBuglyUserInfo = 'get_bugly_userinfo',
  OnGetBuglyAppList = 'get_bugly_applist',
  OnGetBuglyAppVersions = 'get_bugly_appversions'
}
