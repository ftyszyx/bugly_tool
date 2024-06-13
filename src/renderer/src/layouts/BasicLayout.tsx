import { ChildProps } from '@renderer/entitys/other.entity'
import { AppStore, use_appstore } from '@renderer/models/app.model'
import Layout, { Content, Footer } from 'antd/es/layout/layout'
import { useEffect } from 'react'
import MyMenu from '@renderer/components/admin_menu'
import MyHeader from '@renderer/components/admin_header'
import { getAllMenus } from '@renderer/entitys/menu.entity'
import MyBread from '@renderer/components/admin_bread'
import { FloatButton } from 'antd'
import { QuestionCircleOutlined } from '@ant-design/icons'
import { BuglyModel, use_bugly } from '@renderer/models/bugly.model'

function BasicLayout(props: ChildProps): JSX.Element {
  console.log('basiclayout render')
  const buglyStore = use_bugly() as BuglyModel
  useEffect(() => {
    window.electron.ipcRenderer.on('bugly-session', (_, bugly_session) => {
      console.log('get session', bugly_session)
      buglyStore.setSession(bugly_session)
    })
  }, [])
  useEffect(() => {
    if (buglyStore.bugly_session == '') {
      window.electron.ipcRenderer.send('open_bugly_login')
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
