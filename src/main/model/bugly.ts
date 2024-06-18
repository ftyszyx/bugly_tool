import { net } from 'electron'
import { randomBytes } from 'crypto'
import {
  BuglyAppCrashDateInfo,
  BuglyAppDetail,
  BuglyAppInfo,
  BuglyUserInfo
} from '../../common/entitys/bugly.entity'
import AppModel from './app.model'
import { MainToWebMsg } from '../../common/entitys/ipcmsg.entity'
class BuglyHelper {
  bugly_session: string = ''
  user_info: BuglyUserInfo | null = null
  app_list: BuglyAppInfo[] = []
  old_base_url = 'https://bugly.qq.com/v4/api/old'
  fsn_arr: string[] = []
  constructor() {
    for (let i = 0; i < 256; i++) {
      this.fsn_arr.push((i + 256).toString(16).substring(1))
    }
  }

  get_fsn() {
    var bytes = randomBytes(16) //uint8array
    bytes[6] = (15 & bytes[6]) | 64
    bytes[8] = (63 & bytes[8]) | 128
    return (
      this.fsn_arr[bytes[0]] +
      this.fsn_arr[bytes[1]] +
      this.fsn_arr[bytes[2]] +
      this.fsn_arr[bytes[3]] +
      '-' +
      this.fsn_arr[bytes[4]] +
      this.fsn_arr[bytes[5]] +
      '-' +
      this.fsn_arr[bytes[6]] +
      this.fsn_arr[bytes[7]] +
      '-' +
      this.fsn_arr[bytes[8]] +
      this.fsn_arr[bytes[9]] +
      '-' +
      this.fsn_arr[bytes[10]] +
      this.fsn_arr[bytes[11]] +
      this.fsn_arr[bytes[12]] +
      this.fsn_arr[bytes[13]] +
      this.fsn_arr[bytes[14]] +
      this.fsn_arr[bytes[15]]
    ).toLowerCase()
  }

  setCommonHeader(request: Electron.ClientRequest) {
    request.setHeader('Referer', 'https://bugly.qq.com/v2/workbench/apps')
    request.setHeader(
      'User-Agent',
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.6099.291 Safari/537.36'
    )
    request.setHeader('Accept', 'application/json;charset=utf-8')
    request.setHeader('Content-Type', 'application/json;charset=utf-8')
    request.setHeader('Accept-Language', 'zh-CN,zh;q=0.9,en;q=0.8,en-GB;q=0.7,en-US;q=0.6')
    console.log('write session', this.bugly_session)
    request.setHeader('Cookie', `bugly-session=${this.bugly_session}`)
  }

  async initbuylyInfo() {
    this.user_info = await this.get_bugly_info<BuglyUserInfo>(this.old_base_url + '/info').catch(
      (_) => {
        return null
      }
    )
    if (this.user_info == null) {
      return
    }
    AppModel.getInstance().sendMsgToWeb(MainToWebMsg.OnGetBuglyUserInfo, this.user_info)
    var applist = await this.get_bugly_info<BuglyAppInfo[]>(this.old_base_url + '/app-list', {
      userId: this.user_info?.userId
    }).catch((_) => {
      return []
    })
    var appset = new Set<string>()
    this.app_list = applist.filter((item) => {
      if (appset.has(item.appId)) {
        return false
      }
      appset.add(item.appId)
      return true
    })
    AppModel.getInstance().sendMsgToWeb(MainToWebMsg.OnGetBuglyAppList, this.app_list)
  }

  async getAppVersion(appinfo: BuglyAppInfo) {
    const res = await this.get_bugly_info<BuglyAppDetail>(this.old_base_url + '/get-app-info', {
      appId: appinfo.appId,
      pid: appinfo.pid.toString(),
      types: 'version' //version,member,tag,channel
    }).catch((_) => {})
    if (res == null) {
      return []
    }
    return res.versionList.map((item) => item.name)
  }

  async getAppsVersions(apps: string[]) {
    let res_versions: string[] = []
    for (const app of apps) {
      var appinfo = this.app_list.find((item) => item.appId == app)
      if (appinfo == null) continue
      const versions = await this.getAppVersion(appinfo)
      res_versions = res_versions.concat(versions)
    }
    return res_versions
  }

  async getDayCrashInfo(appinfo: BuglyAppInfo, version: string, start: string, end: string) {
    const res = await this.get_bugly_info<{ data: BuglyAppCrashDateInfo[] }>(
      'https://bugly.qq.com/v4/api/old/get-crash-trend',
      {
        appId: appinfo.appId,
        pid: appinfo.pid.toString(),
        type: 'crash',
        dataType: 'trendData',
        startDate: start, //20240101
        endDate: end,
        version
      }
    ).catch((_) => {})
    if (res == null) {
      return []
    }
    return res.data
  }

  async getHourCrashInfo(appinfo: BuglyAppInfo, version: string, start: string, end: string) {
    const res = await this.get_bugly_info<{ data: BuglyAppCrashDateInfo[] }>(
      this.old_base_url + '/get-real-time-hourly-stat',
      {
        appId: appinfo.appId,
        pid: appinfo.pid.toString(),
        type: 'crash',
        startHour: start, //2024061700
        endHour: end, //2024061723
        dataType: 'realTimeTrendData',
        version //全版本就是-1
      }
    ).catch((_) => {})
    if (res == null) {
      return []
    }
    return res.data
  }

  async get_bugly_info<T>(src_url: string, params?: Record<string, number | string>): Promise<T> {
    const url = new URL(src_url)
    url.searchParams.append('fsn', this.get_fsn())
    if (params) {
      for (const key in params) {
        url.searchParams.append(key, params[key].toString())
      }
    }
    const url_str = url.toString()
    console.log('get user info1', url_str)
    const request = net.request(url_str)
    this.setCommonHeader(request)
    request.end()
    return new Promise((resolve, reject) => {
      request.on('response', (response) => {
        var data = ''
        response.on('data', (chunk) => {
          data += chunk.toString()
        })
        response.on('end', () => {
          // console.log(`get info ok:${data}`)
          const res = JSON.parse(data).data
          resolve(res as T)
        })
        response.on('error', (error) => {
          console.log('get info error', error, url_str)
          reject(error)
        })
      })
    })
  }
}

export default BuglyHelper
