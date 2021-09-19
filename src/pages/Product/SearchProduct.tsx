import { Card, Form, Row, Col, Typography, Input, Space } from 'antd';
import { SearchOutlined, PlusOutlined } from '@ant-design/icons';
import ButtonUI from '../../components/UIKit/ButtonUI';
import { Link } from 'react-router-dom';
const { Title } = Typography;

const SearchProducts = ()=> {
    const handleSubmit = (e: any) => {
        // call api
    }
    const handleAdd = (e: any) => {
    }
    return (
        <Card className="border-small border-2 shadow-small py-4">
            <Form name="searchEngine" onFinish={handleSubmit}>
                <Row className="d-flex" justify="center">
                    <Title level={4}> Quản lý sản phẩm</Title>
                </Row>
                <Row className="mt-5">
                    <Col span={24} className="px-5">
                        <Title level={5}>Nhập thông tin cần tìm (ID, tên sản phẩm,...) </Title>
                        <Form.Item name="SearchField">
                            <Input />
                        </Form.Item>
                    </Col>
                </Row>
                <Row className="mt-4 d-flex px-5" justify="end">
                    <Space size={10}>
                        <ButtonUI
                            text="Tìm"
                            style={{ width: "7em" }}
                            htmlType="submit"
                            withIcon={<SearchOutlined />}
                        />
                        <Link to="/addcategory">
                            <ButtonUI
                                text="Thêm"
                                onClick={handleAdd}
                                withIcon={<PlusOutlined />}
                            />
                        </Link>
                    </Space>
                </Row>
            </Form>
        </Card>
    )
}

export default SearchProducts;