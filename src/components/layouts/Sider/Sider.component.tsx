import { Layout, Menu } from "antd"
import {
  ShoppingCartOutlined,
  UserOutlined
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
        <SubMenu key="user" icon={<UserOutlined />} title="Tài khoản">
          <Menu.Item key="signin">
            <Link to="/signin">
              Đăng nhập
            </Link>
          </Menu.Item>
          <Menu.Item key="signup">
            <Link to="/signup">
              Đăng ký
            </Link>
          </Menu.Item>
        </SubMenu>
      </Menu>
    </Sider>
  )
}

export default SiderComponent
