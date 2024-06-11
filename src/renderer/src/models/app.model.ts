import { AppEntity } from '@renderer/entitys/app.entity'
import { create } from '@renderer/libs/state'

export interface AppStore extends AppEntity {}
export const use_appstore = create<AppStore>((set, get) => {
  return {
    bugly_session_v4: '',
    fold_menu: false,
    setSession(session) {
      set((state) => {
        return { ...state, bugly_session_v4: session }
      })
    },
    toggleFoldMenu() {
      set((state) => {
        return { ...state, fold_menu: !state.fold_menu }
      })
    }
  }
})
