import { Modal, Card, Table, Skeleton, Typography, BackTop, Row, Col } from "antd"
import { Link } from 'react-router-dom'
import ButtonUI from "../../components/UIKit/ButtonUI"
import { getCategoryList, selectCategoryList, deleteCategory } from "../../stores/category.slice"
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { CategoryI } from '../../types'

const { Column } = Table
const { Text } = Typography

const TableCategories = () => {
    const dispatch = useDispatch()
    const [visibleDelete, setVisibleDelete] = useState(false)
    const [selectedId, setSelectedId] = useState(null)
    const categories: Array<CategoryI> = useSelector(selectCategoryList)!

    useEffect(() => {
        dispatch(getCategoryList())
    }, [])

    const handleDelete = () => {
        dispatch(deleteCategory(selectedId!))
        setVisibleDelete(false)
    }
    return (
        <Card className="border-small shadow-small mt-4 rounded-3">
            <Modal
                title={`Thông báo ${selectedId}`}
                visible={visibleDelete}
                onCancel={() => { setVisibleDelete(false) }}
                footer={[
                    <ButtonUI text="Quay lại"
                        variant="light"
                        key="back"
                        onClick={() => { setVisibleDelete(false) }}
                    />,
                    <ButtonUI text="Xác nhận"
                        variant="danger"
                        key="submit"
                        type="primary"
                        onClick={handleDelete}
                    />,
                ]}
            >
                <p>Bạn có chắc chắn muốn xóa ?</p>
            </Modal>
            <Table
                dataSource={categories.map((category) => ({
                    ...category,
                    key: category.id,
                }))}
                scroll={{ x: 1036 }}
                // pagination={false}
                locale={{
                    emptyText: categories ? <Skeleton /> : "",
                }}
            >
                {categories.length > 0 ? (
                    <>
                        <Column
                            title={<Text strong>STT</Text>}
                            dataIndex="index"
                            key="index"
                            render={(value, item, index) => 1 + index}
                        />

                        <Column
                            title={<Text strong>Danh mục</Text>}
                            dataIndex="name"
                            render={(text, record: any) => (
                                <Link to={`/category/${record.id}`}>
                                    <Text className="text-link-direction">
                                        ID: {record.id} <br />
                                        {record.name}
                                    </Text>
                                </Link>
                            )}
                        />
                        <Column
                            title={<Text strong>Mô tả</Text>}
                            className="column-30"
                            dataIndex="description"
                            render={(text, record: any) => (
                                <Text>
                                    {record.description}
                                </Text>
                            )}
                        />
                        <Column
                            title={<Row className="d-flex" justify="end"><Text strong>Tùy chọn</Text></Row>}
                            dataIndex="LandOwnerName"
                            render={(text, record: any) => (
                                <Row className="d-flex" justify="end" gutter={10}>
                                    <Col>
                                        <ButtonUI variant="danger" text="Xóa" onClick={() => { setSelectedId(record.id); setVisibleDelete(true) }} />
                                    </Col>
                                    <Col>
                                        <Link to={`/updatecategory/${record.id}`}>
                                            <ButtonUI variant="light" text="Sửa" />
                                        </Link>
                                    </Col>
                                </Row>
                            )}
                        />
                    </>
                ) : <Skeleton />}
            </Table>
            <BackTop style={{ right: "5%" }} />
        </Card>
    )
}

export default TableCategories