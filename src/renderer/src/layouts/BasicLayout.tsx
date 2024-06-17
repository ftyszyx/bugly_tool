import { ChildProps } from 'src/common/entitys/other.entity'
import Layout, { Content, Footer } from 'antd/es/layout/layout'
import { useEffect } from 'react'
import MyMenu from '@renderer/components/admin_menu'
import MyHeader from '@renderer/components/admin_header'
import MyBread from '@renderer/components/admin_bread'
import { FloatButton } from 'antd'
import { QuestionCircleOutlined } from '@ant-design/icons'
import { BuglyModel, use_bugly } from '@renderer/models/bugly.model'
import { MainToWebMsg, WebToMainMsg } from '@common/entitys/ipcmsg.entity'

function BasicLayout(props: ChildProps): JSX.Element {
  console.log('basiclayout render')
  const buglyStore = use_bugly() as BuglyModel
  useEffect(() => {
    window.electron.ipcRenderer.on(MainToWebMsg.OnGetBuglySession, (_, bugly_session) => {
      console.log('get session', bugly_session)
      buglyStore.setSession(bugly_session)
    })
    return () => {
      window.electron.ipcRenderer.removeAllListeners('bugly-session')
    }
  }, [])
  useEffect(() => {
    if (buglyStore.bugly_session == '') {
      window.electron.ipcRenderer.send(WebToMainMsg.OpenBuglyLogin)
    }
  }, [buglyStore.bugly_session])
  return (
    <Layout className="w-full min-h-screen" hasSider>
      <MyMenu />
      <Layout>
        <MyHeader />
        <MyBread />
        <Content className="mx-1 my-0 mr-0 p-0 bg-white h-full min-h-[280px]">
          {props.children}
        </Content>
        <Footer />
      </Layout>
      <FloatButton
        className=" left-3"
        icon={<QuestionCircleOutlined />}
        type="default"
        style={{ right: 94 }}
        onClick={() => {
          window.open('https://rg975ojk5z.feishu.cn/wiki/IwgSwRnE4igubBkRX5OcMSXDnmg')
        }}
      />
    </Layout>
  )
}

export default BasicLayout
