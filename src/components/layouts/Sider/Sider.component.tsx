import { Layout, Menu } from "antd"
import {
  DesktopOutlined,
  PieChartOutlined,
  FileOutlined,
  TeamOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons"
import { useState } from "react"
import { Link } from 'react-router-dom'
const { Sider } = Layout
const { SubMenu } = Menu

const SiderComponent = () => {
  const [collapsed, setCollapsed] = useState(false)
  function onCollapse(collapsed: any) {
    setCollapsed(collapsed)
  };

  return (
    <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
      <div className="logo" />

      <Menu theme="light" defaultSelectedKeys={["category"]} mode="inline">
        <SubMenu key="category" icon={<ShoppingCartOutlined />} title="Danh mục">
          <Menu.Item key="listcategories">
            <Link to="/category">
              Danh sách
            </Link>
          </Menu.Item>
          <Menu.Item key="addcategory">
            <Link to="/addcategory">
              Thêm danh mục
            </Link>
          </Menu.Item>
        </SubMenu>
        <Menu.Item key="1" icon={<PieChartOutlined />}>
          Option 1
        </Menu.Item>
        <Menu.Item key="2" icon={<DesktopOutlined />}>
          Option 2
        </Menu.Item>
        <SubMenu key="sub2" icon={<TeamOutlined />} title="Team">
          <Menu.Item key="6">Team 1</Menu.Item>
          <Menu.Item key="8">Team 2</Menu.Item>
        </SubMenu>
        <Menu.Item key="9" icon={<FileOutlined />}>
          Files
        </Menu.Item>
      </Menu>
    </Sider>
  )
}

export default SiderComponent
