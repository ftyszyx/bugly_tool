import { Modal, message } from 'antd'
import RootRouter from './route'
function App(): JSX.Element {
  window.electron.ipcRenderer.on('ShowMsgErr', (_, msg, duration) => {
    message.error(msg, duration)
  })
  window.electron.ipcRenderer.on('ShowMsgInfo', (_, msg, duration) => {
    message.info(msg, duration)
  })
  window.electron.ipcRenderer.on('LoadBuglyErr', (_, errmsg) => {
    Modal.error({
      title: '打开bugly失败',
      content: errmsg,
      okText: '重试',
      onOk: () => {
        window.electron.ipcRenderer.send('open_bugly_login')
      }
    })
  })
  return <RootRouter></RootRouter>
}

export default App
