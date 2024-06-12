import { BrowserWindow } from 'electron'
import BuglyHelper from './bugly'

class AppModel {
  mainWindow: BrowserWindow | null = null
  bulgy_helper: BuglyHelper = new BuglyHelper()
  bugly_session: string = ''
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
}

export default AppModel
