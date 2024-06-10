import BasicLayout from './layouts/BasicLayout'
import { BrowerRouter, Route } from './libs/router'

const RootRouter = () => {
  return (
    <BrowerRouter>
      <Route path="/" element={BasicLayout}></Route>
    </BrowerRouter>
  )
}
export default RootRouter
