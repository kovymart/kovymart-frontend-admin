import { Row, Col, Card, Typography, Form, Input } from 'antd';
import { PlusOutlined } from "@ant-design/icons";
import ButtonUI from '../../components/UIKit/ButtonUI';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addCategory, selectRequesting } from '../../stores/category.slice';
import { CategoryI } from '../../types';
import { categoryIcon } from '../../constants/category';
import { useEffect } from 'react';

const { Title } = Typography;
const { TextArea } = Input;

function AddCategory() {
	const dispatch = useDispatch();
	const handleSubmit = (e: CategoryI) => {
		dispatch(addCategory(e));
	};

	const [form] = Form.useForm();
	const requesting = useSelector(selectRequesting);

	useEffect(() => {
		form.setFieldsValue({
			image: categoryIcon,
		});
	}, [form]);

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
					<Form layout="vertical" onFinish={handleSubmit} form={form}>
						<Row gutter={16} >
							<Col xs={24} lg={8}>
								<Title level={5}>Tên danh mục </Title>
								<Form.Item name="name"
									rules={[{ required: true, message: 'Vui lòng nhập thông tin này!' }]}
								>
									<Input />
								</Form.Item>
								<Title level={5}>Icon danh mục </Title>
								<Form.Item name="image">
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
									requesting={requesting}
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
	);
}

export default AddCategory;