import { WebToMainMsg } from '@common/entitys/ipcmsg.entity'
import { BuglyModel, use_bugly } from '@renderer/models/bugly.model'
import { Button, DatePicker, Form, Select } from 'antd'
import { useState } from 'react'
enum CrashType {
  num_rate = 1, //次数崩溃率
  device_rate = 2, //设备崩溃率
  crash_num = 3, //崩溃次数
  crash_device_num = 4, //崩溃设备数
  device_num = 5 //设备数
}

export default function Home() {
  const buglystore = use_bugly() as BuglyModel
  const [form] = Form.useForm()
  const [versionlist, setVersionlist] = useState([])
  console.log('home render', buglystore.applist)
  return (
    <div>
      <div>
        <Form
          form={form}
          className="flex flex-row [&>div]:mr-10"
          onFinish={(values: any) => {
            console.log(values)
          }}
        >
          <Form.Item name="app_name" className=" w-[300px]" label="应用名">
            <Select
              mode="multiple"
              allowClear
              onChange={async (values: string[]) => {
                const versions = await window.electron.ipcRenderer.invoke(
                  WebToMainMsg.GetAppVersions,
                  values
                )
                setVersionlist(versions)
              }}
            >
              {buglystore.applist?.map((item) => {
                return (
                  <Select.Option key={item.appKey} value={item.appId}>
                    {item.appName}
                  </Select.Option>
                )
              })}
            </Select>
          </Form.Item>
          <Form.Item name="version" className=" w-[200px]" label="版本">
            <Select mode="multiple" allowClear>
              {versionlist.map((item) => {
                return (
                  <Select.Option key={item} value={item}>
                    {item}
                  </Select.Option>
                )
              })}
            </Select>
          </Form.Item>
          <Form.Item name="crash_type" className=" w-[200px]" label="类型">
            <Select>
              <Select.Option value={CrashType.num_rate}>次数崩溃率</Select.Option>
              <Select.Option value={CrashType.device_rate}>设备崩溃率</Select.Option>
              <Select.Option value={CrashType.device_num}>设备总数</Select.Option>
              <Select.Option value={CrashType.crash_num}>崩溃次数</Select.Option>
              <Select.Option value={CrashType.crash_device_num}>崩溃设备数</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item name="data_range" label="时间">
            <DatePicker.RangePicker></DatePicker.RangePicker>
          </Form.Item>
        </Form>
      </div>
      <Button
        type="primary"
        onClick={() => {
          form.resetFields()
        }}
      >
        清除
      </Button>
      <Button type="primary" onClick={() => {}}>
        搜索
      </Button>
    </div>
  )
}
