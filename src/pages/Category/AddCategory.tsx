import { Row, Col, Card, Typography, Form, Input, Space } from 'antd'
import { PlusOutlined } from "@ant-design/icons"
import ButtonUI from '../../components/UIKit/ButtonUI'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {addCategory, selectRequesting} from '../../stores/category.slice'

const { Title } = Typography
const { TextArea } = Input

function AddCategory() {
    const dispatch = useDispatch()
    const handleSubmit = (e: object) => {
       dispatch(addCategory(e))
    }
    const requesting = useSelector(selectRequesting)
    
    return (
        <Card
            style={{ width: "100%" }}
            title={<Title level={4} className="color-primary" >
                Thêm danh mục
            </Title>}
            className="border-small shadow-sm rounded-3"
        >
            <Row className="d-flex" justify="center">
                <Col xs={24} md={20}>
                    <Form layout="vertical" onFinish={handleSubmit}>

                        <Row gutter={16} >
                            <Col xs={24} lg={8}>
                                <Title level={5}>Tên danh mục </Title>
                                <Form.Item name="name"
                                    rules={[{ required: true, message: 'Vui lòng nhập thông tin này!' }]}
                                >
                                    <Input />
                                </Form.Item>
                            </Col>
                            <Col xs={24} lg={16}>
                                <Title level={5}>Mô tả </Title>
                                <Form.Item name="description"
                                    rules={[{ required: true, message: 'Vui lòng nhập thông tin này!' }]}
                                >
                                    <TextArea rows={8} />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row className="d-flex mt-5 mb-3" justify="center" gutter={10}>
                            <Col>
                                <ButtonUI
                                    text="Thêm"
                                    htmlType="submit"
                                    withIcon={<PlusOutlined />}
                                    requesting = {requesting}
                                />
                            </Col>
                            <Col>
                                <Link to="/category">
                                    <ButtonUI
                                        variant="secondary"
                                        text="Quay lại"
                                    />
                                </Link>
                            </Col>
                        </Row>
                    </Form>
                </Col>
            </Row>
        </Card>
    )
}

export default AddCategory