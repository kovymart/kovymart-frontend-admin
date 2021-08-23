import { Switch } from "react-router-dom"
import "./App.less"
import "./index.css"
import { Wrapper } from "./components/layouts/Wrapper/Wrapper.component"
import { Pages } from "./pages"
import { PrivateRoute } from "./routes/PrivateRoute"
import SiderComponent from "./components/layouts/Sider/Sider.component"
import FooterComponent from "./components/layouts/Footer/Footer.component"
import { Layout } from 'antd'
const { Header } = Layout
function App() {
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <SiderComponent/>
      <Layout className="site-layout">
        <Header className="site-layout-background" style={{ padding: 0 }} />
        <Wrapper>
          <Switch>
            <PrivateRoute path="/">
              <Pages />
            </PrivateRoute>
          </Switch>
        </Wrapper>
        <FooterComponent/>
      </Layout>
    </Layout>
  )
}

export default App
