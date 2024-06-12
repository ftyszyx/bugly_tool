import { BrowserWindow, session } from 'electron'
import AppModel from '../model/app.model'

function getToken(loginwin: BrowserWindow) {
  loginwin.webContents.session.cookies.get({ domain: 'bugly.qq.com' }).then((cookies) => {
    const bugly_session_mid = cookies.find((cookie) => cookie.name == 'bugly-session')
    if (bugly_session_mid) {
      console.log('bugly_session', bugly_session_mid?.value)
      AppModel.getInstance().mainWindow?.webContents.send('bugly-session', bugly_session_mid?.value)
      AppModel.getInstance()
        .mainWindow?.webContents.session.cookies.get({ domain: 'bugly.qq.com' })
        .then((cookies) => {
          console.log('main cookies', cookies)
        })
      AppModel.getInstance().mainWindow?.webContents.session.cookies.set({
        domain: 'bugly.qq.com',
        name: 'bugly-session',
        value: bugly_session_mid?.value,
        url: ''
      })
      AppModel.getInstance().bugly_session = bugly_session_mid?.value
      AppModel.getInstance().bulgy_helper.getUserInfo()
      loginwin.close()
    }
  })
}

export function cleanToken() {
  AppModel.getInstance().bugly_session = ''
  session.defaultSession.clearStorageData().then(() => {
    console.log('clear storage data ok')
  })
}

export function checkbuglyLogin() {
  AppModel.getInstance().bugly_session = ''
  const loginwin = new BrowserWindow({
    width: 860,
    height: 570,
    alwaysOnTop: true,
    resizable: true,
    maximizable: true,
    minimizable: true,
    fullscreenable: true
  })
  loginwin.on('closed', () => {
    console.log('login window closed')
  })
  loginwin.webContents.on('will-navigate', (_, url) => {
    console.log('navigate to ', url)
  })
  loginwin.webContents.on('did-finish-load', async () => {
    console.log('did-finish-load')
    getToken(loginwin)
  })
  loginwin
    .loadURL('https://bugly.qq.com/v2/workbench/apps')
    .then()
    .catch((error) => {
      console.log('load err error', error)
      AppModel.getInstance().sendmsg(
        'LoadBuglyErr',
        `打开bugly失败，请检查网络或者登录状态: ${error}`
      )
      loginwin.close()
    })
}

export function getBuglyAppList() {}
