import { BrowserWindow, session } from 'electron'
import BuglyHelper from './bugly'

const web_filter = {
  urls: ['https://*.bugly.qq.com/*']
  // urls: ['*://*/*']
}
class AppModel {
  mainWindow: BrowserWindow | null = null
  buglyhelper: BuglyHelper = new BuglyHelper()
  constructor() {}
  private static instance: AppModel
  public static getInstance() {
    if (!AppModel.instance) {
      AppModel.instance = new AppModel()
    }
    return AppModel.instance
  }

  public showMsgErr(msg: string, duration: number = 3000) {
    this.mainWindow?.webContents.send('ShowMsgErr', msg, duration)
  }
  public showMsgInfo(msg: string, duration: number = 3000) {
    this.mainWindow?.webContents.send('ShowMsgInfo', msg, duration)
  }
  public sendmsg(event: string, ...args: any[]) {
    this.mainWindow?.webContents.send(event, ...args)
  }

  public initNetwork() {
    session.defaultSession.webRequest.onBeforeSendHeaders(web_filter, (details, callback) => {
      callback({ cancel: false, requestHeaders: details.requestHeaders })
    })
    session.defaultSession.webRequest.onSendHeaders((detail) => {
      // console.log('on send header', JSON.stringify(detail.requestHeaders), detail.url)
    })
  }
}

export default AppModel
