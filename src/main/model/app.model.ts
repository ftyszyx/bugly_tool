import { BrowserWindow } from 'electron'

class AppModel {
  public mainWindow: BrowserWindow | null = null
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
}

export default AppModel
