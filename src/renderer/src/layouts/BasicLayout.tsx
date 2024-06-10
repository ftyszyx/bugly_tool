import { ChildProps } from '@renderer/entitys/other.entity'
import { AppStore, use_appstore } from '@renderer/models/app.model'
import { Button } from 'antd'
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons'
import Layout, { Content, Footer, Header } from 'antd/es/layout/layout'
import { useEffect, useState } from 'react'

function BasicLayout(props: ChildProps): JSX.Element {
  console.log('basiclayout render')
  const appstore = use_appstore() as AppStore
  const [collapsed, setCollapsed] = useState(false) // 菜单栏是否收起
  const ipcHandle = (): void => window.electron.ipcRenderer.send('open_bugly_login')
  useEffect(() => {
    if (appstore.bugly_session_v4 == '') {
      ipcHandle()
    }
  }, [])
  return (
    <Layout className="w-full min-h-screen" hasSider>
      {/* <MenuCom data={userstore.menus} collapsed={collapsed} /> */}
      <Layout>
        <Header>
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: '16px',
              width: 64,
              height: 64
            }}
          />
        </Header>
        <Content className="mx-1 my-0 mr-0 p-0 bg-white h-full min-h-[280px]">
          {props.children}
        </Content>
        <Footer />
      </Layout>
    </Layout>
  )
}

export default BasicLayout
