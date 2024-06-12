import { net } from 'electron'
import { randomBytes } from 'crypto'
class BuglyHelper {
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

  async getUserInfo() {
    const url = new URL('https://bugly.qq.com/v4/api/old/info')
    url.searchParams.append('fsn', this.get_fsn())
    const url_str = url.toString()
    console.log('get user info', url_str)
    const response = await net.fetch(url_str, {
      method: 'get',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        Accept: 'application/json;charset=utf-8'
      }
    })
    if (response.ok) {
      const res_text = await response.text()
      console.log('get user info text', res_text)
      const body = await response.json()
      console.log('get user info', body)
    } else {
      console.log('get user info error', response.statusText)
    }
  }
}

export default BuglyHelper
