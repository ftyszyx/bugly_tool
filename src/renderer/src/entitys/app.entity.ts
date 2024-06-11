export interface AppEntity {
  bugly_session_v4: string
  fold_menu: boolean
  setSession: (session: string) => void
  toggleFoldMenu: () => void
}
