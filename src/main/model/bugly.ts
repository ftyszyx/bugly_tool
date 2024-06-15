import { net, session } from 'electron'
import { randomBytes } from 'crypto'
class BuglyHelper {
  bugly_session: string = ''
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

  async getUserInfo() {
    const url = new URL('https://bugly.qq.com/v4/api/old/info')
    url.searchParams.append('fsn', this.get_fsn())
    const url_str = url.toString()
    console.log('get user info1', url_str)
    const request = net.request(url_str)
    this.setCommonHeader(request)
    request.on('response', (response) => {
      response.on('data', (chunk) => {
        console.log('get user info2', chunk.toString())
      })
      response.on('end', () => {
        console.log('get user info end')
      })
      response.on('error', (error) => {
        console.log('get user info error', error)
      })
    })
    request.end()
  }
}

export default BuglyHelper
