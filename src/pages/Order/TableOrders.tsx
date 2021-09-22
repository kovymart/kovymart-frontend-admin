import { useState, useEffect, useCallback } from 'react';
import {
  Card,
  Table,
  Skeleton,
  Typography,
  BackTop,
  Row,
  Col,
  Select,
  Spin
} from "antd";
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import ButtonUI from "../../components/UIKit/ButtonUI";
import {
  getOrderList,
  selectOrderList,
  selectPageSizeOrder,
  selectStatusSelected,
  setStatusSelected,
  selectRequesting,
  selectUpdateStatus,
} from '../../stores/order.slice';
import { OrderI } from '../../types';
import Date from '../../helpers/Date';
import Status from '../../components/UIKit/Status';
import ModalStatus from './ModalStatus';

const { Column } = Table;
const { Text } = Typography;
const { Option } = Select;

const TableOrders = () => {
  const dispatch = useDispatch();
  const orders: Array<OrderI> = useSelector(selectOrderList)!;
  const pageSize = useSelector(selectPageSizeOrder)!;
  const statusSelected = useSelector(selectStatusSelected);
  const requesting = useSelector(selectRequesting);
  const requesting_updateStatus = useSelector(selectUpdateStatus);
  useEffect(() => {
    const data = {
      limit: 10,
      page: 1,
      status: 1
    };
    dispatch(getOrderList(data));
    dispatch(setStatusSelected(1));
  }, [dispatch]);

  // Handle update status order
  const [idSelected, setIdSelected] = useState<number>();
  const [visibleModalUpdate, setVisibleModalUpdate] = useState(false);
  const modalUpdateCallback = useCallback(
    (val) => {
      setVisibleModalUpdate(val);
    },
    [setVisibleModalUpdate]
  );

  const handleUpdate = (id: number) => {
    setIdSelected(id);
    setVisibleModalUpdate(true);
  };

  const handleFilter = (e: string) => {
    const data = {
      limit: 10,
      page: 1,
      status: parseInt(e)
    };
    dispatch(getOrderList(data));
    dispatch(setStatusSelected(parseInt(e)));
  };

  const handlePagination = (e: number) => {
    const data = {
      limit: 10,
      page: e,
      status: statusSelected,
    };
    dispatch(getOrderList(data));
  };

  return (
    <>
      <ModalStatus
        id={idSelected}
        visible={visibleModalUpdate}
        setVisibility={modalUpdateCallback}
      />
      <Row className="d-flex" justify="end">
        <Select className="float-right" defaultValue="1" style={{ width: '15rem' }} onChange={handleFilter}>
          <Option value="1">Đã thanh toán</Option>
          <Option value="2">Chưa thanh toán</Option>
        </Select>
      </Row>
      <Card className="border-small shadow-small mt-4 rounded-3">
        <Table
          dataSource={orders.map((category) => ({
            ...category,
            key: category!.id,
          }))}
          scroll={{ x: 1036 }}
          pagination={{ total: pageSize, onChange: (e) => { handlePagination(e); } }}
          locale={{
            emptyText: orders ? <Skeleton /> : "",
          }}
        >
          {orders.length > 0 ? (
            <>
              <Column
                title={<Text strong>STT</Text>}
                dataIndex="index"
                key="index"
                render={(value, item, index) => 1 + index}
              />

              <Column
                title={<Text strong>Thông tin đơn hàng </Text>}
                dataIndex="name"
                render={(text, record: any) => (
                  <Text>
                    <Text strong>ID:</Text> {record.id}<br />
                    {record.totalPrice > 0 ?
                      <>
                        <Text strong>Thành tiền: </Text>
                        {"  "} {record.totalPrice.toLocaleString('en-US', { style: 'currency', currency: 'VND' })}<br />
                      </>
                      : ""}
                    <Text strong> Ngày lập: </Text> <Date date={record.createdAt} />
                  </Text>
                )}
              />
              <Column
                title={<Text strong>Thông tin khách hàng</Text>}
                dataIndex="name"
                render={(text, record: any) => (
                  <Text>
                    <Text strong> ID: </Text> {record.customer.id} <br />
                    <Text strong> Email: </Text> {record.customer.email} <br />
                  </Text>
                )}
              />
              <Column
                title={<Text strong>Ghi chú</Text>}
                dataIndex="description"
                render={(text, record: any) => (
                  <Text>
                    {record.note}
                  </Text>
                )}
              />
              <Column
                title={<Text strong>Trạng thái</Text>}
                dataIndex="name"
                render={(text, record: any) => (
                  <>
                    {requesting_updateStatus
                      ? <Spin />
                      :
                      <Status status={record.status} />
                    }
                  </>
                )}
              />
              <Column
                title={<Row className="d-flex" justify="end"><Text strong>Tùy chọn</Text></Row>}
                dataIndex="LandOwnerName"
                render={(text, record: any) => (
                  <Row className="d-flex" justify="end" gutter={10} >
                    <Col>
                      <ButtonUI text="Thay đổi trạng thái" onClick={() => handleUpdate(record.id)} />
                      <br />
                      <Link to={`/order/${record.id}`}>
                        <ButtonUI variant="light" style={{ marginTop: '6px', float: 'right' }} text="Xem chi tiết" />
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
    </>
  );
};

export default TableOrders;;