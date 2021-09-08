import { Row, Col, Card, Typography, Form, Input, Skeleton } from 'antd'
import ButtonUI from '../../components/UIKit/ButtonUI'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { updateCategory, selectRequesting, getCategoryById, selectCategoryById } from '../../stores/category.slice'
import { useEffect } from 'react'
import { useParams } from "react-router-dom"
import { RouteParamsI } from '../../constants/route-params'
import { SyncOutlined } from '@ant-design/icons'
import { CategoryI } from '../../types'
const { Title } = Typography
const { TextArea } = Input
function UpdateCategory() {
    const [form] = Form.useForm()
    const dispatch = useDispatch()

    const handleSubmit = (e: CategoryI) => {
        dispatch(updateCategory({ id: parseInt(params.id), data: e }))
    }


    const params: RouteParamsI = useParams()
    useEffect(() => {
        if (params.id) {
            dispatch(getCategoryById(parseInt(params.id)))
        }
    }, [params.id]) // eslint-disable-line react-hooks/exhaustive-deps

    const requesting = useSelector(selectRequesting)
    const category = useSelector(selectCategoryById)

    // initialize data
    useEffect(() => {
        if (category !== null) {
            form.setFieldsValue({
                name: category.name,
                description: category.description
            })
        }
    }, [category]) // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <>
            {category !== null
                ?

                <Card
                    style={{ width: "100%" }}
                    title={<Title level={4} className="color-primary" >
                        Chỉnh sửa danh mục
                    </Title>}
                    className="border-small shadow-sm rounded-3"
                >
                    <Row className="d-flex" justify="center">
                        <Col xs={24} md={20}>
                            <Form layout="vertical" onFinish={handleSubmit} form={form}>

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
                                            <TextArea rows={8} value={category.description} />
                                        </Form.Item>
                                    </Col>
                                </Row>
                                <Row className="d-flex mt-5 mb-3" justify="center" gutter={10}>
                                    <Col>
                                        <ButtonUI
                                            text="Cập nhật"
                                            htmlType="submit"
                                            requesting={requesting}
                                            withIcon={<SyncOutlined />}
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
                : <Skeleton />
            }</>
    )
}

export default UpdateCategory