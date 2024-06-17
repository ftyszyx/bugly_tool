import { PagePath } from '../../common/entitys/page.entity'
import BasicLayout from './layouts/BasicLayout'
import { BrowerRouter, Route } from './libs/router'
import NotFound from './pages/errpages/404'
import AdminSet from './pages/system/AdminSet'
import BuglyScrawl from './pages/system/BuglyScrawl'
import BuglySearch from './pages/system/BuglySearch'
import Home from './pages/system/Home'

const RootRouter = () => {
  return (
    <BrowerRouter>
      <Route path="/" element={BasicLayout} errorElement={NotFound}>
        <Route path="/" redirect={PagePath.AdminHome} match={{ end: true }} />
        <Route path={PagePath.AdminHome} element={Home} />
        <Route path={PagePath.AdminCrawl} element={BuglyScrawl} />
        <Route path={PagePath.AdminSearch} element={BuglySearch} />
        <Route path={PagePath.AdminSet} element={AdminSet} />
      </Route>
    </BrowerRouter>
  )
}
export default RootRouter
