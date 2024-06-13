import { BuglyModel, use_bugly } from '@renderer/models/bugly.model'
import { Button } from 'antd'

export default function Home() {
  const buglystore = use_bugly() as BuglyModel
  return (
    <div>
      <h1>Home</h1>
      <Button
        type="primary"
        onClick={() => {
          buglystore.initBugly()
        }}
      >
        get userinfo
      </Button>
    </div>
  )
}
