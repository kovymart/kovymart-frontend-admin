import { Row, Col } from 'antd';
import TableOrders from './TableOrders';

export default function Order() {
  return (
    <Col>
      {/* Table data */}
      <Row className="mt-2 d-flex" justify="center">
        <Col>
          <TableOrders />
        </Col>
      </Row>
    </Col>
  );
}
