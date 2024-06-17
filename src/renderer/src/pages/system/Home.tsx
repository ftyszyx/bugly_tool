import { WebToMainMsg } from '@common/entitys/ipcmsg.entity'
import { BuglyModel, use_bugly } from '@renderer/models/bugly.model'
import { Button, Form, Select } from 'antd'

export default function Home() {
  const buglystore = use_bugly() as BuglyModel
  return (
    <div>
      <Form>
        <Form.Item name="app_name">
          <Select></Select>
        </Form.Item>
        <Form.Item name="app_version">
          <Select></Select>
        </Form.Item>
        <Form.Item name="time_range">
          <Select></Select>
        </Form.Item>
        <Form.Item name="">
          <Select></Select>
        </Form.Item>
      </Form>

      <Button
        type="primary"
        onClick={() => {
          window.electron.ipcRenderer.send(WebToMainMsg.GetuserInfo)
          // buglystore.initBugly()
        }}
      >
        get userinfo
      </Button>
    </div>
  )
}
