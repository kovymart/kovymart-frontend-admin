import { useEffect } from 'react';
import { Card, Form, Row, Col, Typography, Input, Space } from 'antd';
import { SearchOutlined, PlusOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import ButtonUI from '../../components/UIKit/ButtonUI';
import { getProductList, setSearchParam } from '../../stores/product.slice';

const { Title } = Typography;

const SearchProducts = () => {
	const dispatch = useDispatch();
	const handleSubmit = (e: any) => {
		const params = {
			...e,
			page: 1,
			limit: 10,
		};
		dispatch(setSearchParam(e));
		dispatch(getProductList(params));
	};

	useEffect(() => {
		const params = {
			page: 1,
			limit: 10,
		};
		dispatch(getProductList(params));
	}, [dispatch]);

	return (
		<Card className="border-small border-2 shadow-small py-4">
			<Form name="searchEngine" onFinish={handleSubmit}>
				<Row className="d-flex" justify="center">
					<Title level={4}> Quản lý sản phẩm</Title>
				</Row>
				<Row className="mt-5">
					<Col span={24} className="px-5">
						<Title level={5}>Nhập thông tin cần tìm (Tên sản phẩm) </Title>
						<Form.Item name="search"
							rules={[{
								min: 2,
								message: "Vui lòng nhập tối thiểu 2 ký tự",
							},
							]}>
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
						<Link to="/addproduct">
							<ButtonUI
								text="Thêm"
								htmlType="button"
								withIcon={<PlusOutlined />}
							/>
						</Link>
					</Space>
				</Row>
			</Form>
		</Card >
	);
};

export default SearchProducts;