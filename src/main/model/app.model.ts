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
}

export default AppModel
