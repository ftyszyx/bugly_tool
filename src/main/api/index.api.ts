import { BrowserWindow } from 'electron'
import AppModel from '../model/app.model'
import { log } from 'util'

export function openBuglyLogin() {
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
  loginwin.webContents.on('will-redirect', (_, url) => {
    console.log('redirect to ', url)
  })
  loginwin.webContents.on('did-finish-load', async () => {
    console.log('did-finish-load')
    const code = 'document.getElementsByTagName("tbody")'
    const res = await loginwin.webContents.executeJavaScript(code)
    console.log('res', res)
  })
  // loginwin.webContents.session.cookies.get({ domain: 'bugly.qq.com' }).then((cookies) => {
  //   console.log('cookies', cookies)
  // })
  // loginwin.webContents.session.cookies.on('changed', (_, cookie, cause, removed) => {
  //   if (cookie.domain == 'bugly.qq.com' && removed == false) {
  //     console.log('cookie changed', cookie, cause, removed)
  //     if (cookie.name == 'bugly_session') {
  //       AppModel.getInstance().mainWindow?.webContents.send('bugly_session', cookie.value)
  //     }
  //     if (cookie.name == 'bugly-session') {
  //       AppModel.getInstance().mainWindow?.webContents.send('bugly-session', cookie.value)
  //     }
  //   }
  // })
  loginwin.loadURL('https://bugly.qq.com/v2/workbench/apps').then()
}
