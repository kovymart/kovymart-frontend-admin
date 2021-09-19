import { Modal, Card, Table, Skeleton, Typography, BackTop, Row, Col } from "antd"
import { Link } from 'react-router-dom'
import ButtonUI from "../../components/UIKit/ButtonUI"
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { ProductI } from '../../types'
import { getProductList, selectProductList, deleteProduct } from "../../stores/product.slice"

const { Column } = Table
const { Text } = Typography

const TableProduct = () =>{
    const dispatch = useDispatch()
    const [visibleDelete, setVisibleDelete] = useState(false);
    const [selectedId, setSelectedId] = useState(null);

    const products: Array<ProductI> = useSelector(selectProductList)!
    

    useEffect(() => {
        dispatch(getProductList())
    }, [dispatch]) // eslint-disable-line react-hooks/exhaustive-deps

    const handleDelete = () => {
        dispatch(deleteProduct(selectedId!))
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
                dataSource={products.map((Product) => ({
                    ...Product,
                    key: Product.id,
                }))}
                scroll={{ x: 1036 }}
                // pagination={false}
                locale={{
                    emptyText: products ? <Skeleton /> : "",
                }}
            >
                {products.length > 0 ? (
                    <>
                        <Column
                            title={<Text strong>STT</Text>}
                            dataIndex="index"
                            key="index"
                            render={(value, item, index) => 1 + index}
                        />

                        <Column
                            title={<Text strong>Sản phẩm</Text>}
                            dataIndex="name"
                            render={(text, record: any) => (
                                <Link to={`/product/${record.id}`}>
                                    <Text className="text-link-direction">
                                        ID: {record.id} <br />
                                        {record.productName}
                                    </Text>
                                </Link>
                            )}
                        />
                        <Column
                            title={<Text strong>Giá</Text>}
                            className="column-30"
                            dataIndex="price"
                            render={(text, record: any) => (
                                <Text>
                                    {record.price}₫
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
                                        <Link to={`/updateproduct/${record.id}`}>
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

export default TableProduct;
