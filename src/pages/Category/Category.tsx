import { Row, Col } from 'antd'
import SearchCategories from './SearchCategories.component'
import TableCategories from './TableCategories'
export default function Category() {
    return (
        <Col>
            {/* Search engine */}
            <Row className="d-flex" justify="center">
                <Col md={16} xs={23}>
                    <SearchCategories />
                </Col>
            </Row>
            {/* Table data */}
            <Row className="mt-2 d-flex" justify="center">
                <Col>
                    <TableCategories />
                </Col>
            </Row>
        </Col>

    )
}
