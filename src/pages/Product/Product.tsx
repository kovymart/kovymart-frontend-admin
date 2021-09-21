import { Row, Col } from 'antd';
import SearchProducts from './SearchProduct';
import TableProducts from './TableProduct';
import './Product.css';

export default function Product() {
   return (
    <Col>
      {/* Search engine */}
      <Row className="d-flex" justify="center">
        <Col md={16} xs={23}>
          <SearchProducts />
        </Col>
      </Row>
      {/* Table data */}
      <Row className="mt-2 d-flex" justify="center">
        <Col>
          <TableProducts />
        </Col>
      </Row>
    </Col>

  );
}
