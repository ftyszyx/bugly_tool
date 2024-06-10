import { BrowserWindow } from 'electron'

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
  loginwin.on('closed', () => {})
  loginwin.webContents.on('will-navigate', (_, url) => {
    console.log('处理窗口内链接跳转: ', url)
  })
  loginwin.loadURL('https://bugly.qq.com/v2/workbench/apps').then()
}
