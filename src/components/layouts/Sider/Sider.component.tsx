import { Layout, Menu, Typography } from "antd";
import {
  ShoppingCartOutlined,
  UserOutlined,
  UnorderedListOutlined,
} from "@ant-design/icons";
import { useState } from "react";
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { checkAuth, clearAccessToken } from '../../../helpers/auth';
import { setSignInMsgToDefault } from "../../../stores/auth.slice";
import { NotifyHelper } from '../../../helpers/NotifyHelper/notify-helper';

const { Sider } = Layout;
const { SubMenu } = Menu;
const { Text } = Typography;

const SiderComponent = () => {
  const dispatch = useDispatch();
  const [collapsed, setCollapsed] = useState(false);
  function onCollapse(collapsed: any) {
    setCollapsed(collapsed);
  };

  function handleLogout() {
    clearAccessToken();
    dispatch(setSignInMsgToDefault());
    NotifyHelper.success('', 'Đăng xuất thành công');
    window.location.reload();
  }
  return (
    <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
      <div className="logo" />
      <Menu theme="light" defaultSelectedKeys={["category"]} mode="inline">
        {checkAuth() ?
          <>
            <SubMenu key="product" icon={<ShoppingCartOutlined />} title="Sản phẩm">
              <Menu.Item key="listproducts">
                <Link to="/product">
                  Danh sách
                </Link>
              </Menu.Item>
              <Menu.Item key="addproduct">
                <Link to="/addproduct">
                  Thêm sản phẩm
                </Link>
              </Menu.Item>
            </SubMenu>
            <SubMenu key="category" icon={<UnorderedListOutlined />} title="Danh mục">
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
          </>
          : null
        }
        <SubMenu key="user" icon={<UserOutlined />} title="Tài khoản">
          {!checkAuth() ?
            <Menu.Item key="signin">
              <Link to="/signin">
                Đăng nhập
              </Link>
            </Menu.Item>
            :
            <Menu.Item key="logout">
              <Text onClick={handleLogout}>
                Đăng xuất
              </Text>
            </Menu.Item>
          }
        </SubMenu>
      </Menu>
    </Sider>
  );
};

export default SiderComponent;
