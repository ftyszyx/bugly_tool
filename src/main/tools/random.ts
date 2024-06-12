import { randomBytes } from 'crypto'
export function getRandomValues(buf) {
  if (!(buf instanceof Uint8Array)) {
    throw new TypeError('expected Uint8Array')
  }
  if (buf.length > 65536) {
    var e = new Error()
    // @ts-expect-error
    e.code = 22
    e.message =
      "Failed to execute 'getRandomValues' on 'Crypto': The " +
      "ArrayBufferView's byte length (" +
      buf.length +
      ') exceeds the ' +
      'number of bytes of entropy available via this API (65536).'
    e.name = 'QuotaExceededError'
    throw e
  }
  var bytes = randomBytes(buf.length)
  buf.set(bytes)
  return buf
}
