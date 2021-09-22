import { Row, Col } from 'antd';
import TableCategories from './TableCategories';

export default function Category() {
	return (
		<Col>
			{/* Table data */}
			<Row className="mt-2 d-flex" justify="center">
				<Col>
					<TableCategories />
				</Col>
			</Row>
		</Col>

	);
}
