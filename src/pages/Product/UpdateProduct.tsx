import { Row, Col, Card, Typography, Form, Input, Skeleton, InputNumber, Select } from 'antd';
import ButtonUI from '../../components/UIKit/ButtonUI';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { updateProduct, selectRequesting, getProductById, selectProductById } from '../../stores/product.slice';
import { useEffect } from 'react';
import { useParams } from "react-router-dom";
import { RouteParamsI } from '../../constants/route-params';
import { SyncOutlined } from '@ant-design/icons';
import { CategoryI, ProductI, SupplierI } from '../../types';
import { getCategoryList, selectCategoryList } from '../../stores/category.slice';
import { getSupplierList, selectSupplierList } from '../../stores/supplier.slice';


const { Title } = Typography;
const { TextArea } = Input;
const { Option } = Select;


function UpdateProduct() {
	const [form] = Form.useForm();
	const dispatch = useDispatch();

	const handleSubmit = (e: ProductI) => {
		if (e) {
			const c = Number(e.categoryId?.toString().replace(/[-/\\^$*+?.()|[\]{}]/g, ''));
			const s = Number(e.supplierId?.toString().replace(/[-/\\^$*+?.()|[\]{}]/g, ''));
			let newProduct = {
				...e,
				categoryId: isNaN(c) ? product.categoryId : c,
				supplierId: isNaN(s) ? product.supplierId : s
			};

			dispatch(updateProduct({ id: parseInt(params.id), data: newProduct }));
		}
	};


	const params: RouteParamsI = useParams();
	useEffect(() => {
		if (params.id) {
			dispatch(getProductById(parseInt(params.id)));
		}
	}, [dispatch, params.id]); // eslint-disable-line react-hooks/exhaustive-deps

	const requesting = useSelector(selectRequesting);
	const product = useSelector(selectProductById);

	const categories: Array<CategoryI> = useSelector(selectCategoryList)!;
	const suppliers: Array<SupplierI> = useSelector(selectSupplierList)!;

	useEffect(() => {
		dispatch(getCategoryList());
		dispatch(getSupplierList());
	}, [dispatch]);

	// initialize data
	useEffect(() => {
		if (product && categories && suppliers && categories.length > 0 && suppliers.length) {

			form.setFieldsValue({
				name: product.name,
				description: product.description,
				sku: product.sku,
				price: product.price,
				unit: product.unit,
				discount: product.discount,
				categoryId: categories[product.categoryId].name,
				supplierId: suppliers[product.supplierId].name
			});
		}
	}, [product, form, suppliers, categories]); // eslint-disable-line react-hooks/exhaustive-deps



	return (
		<>
			{product !== null
				?

				<Card
					style={{ width: "100%" }}
					title={<Title level={4} className="color-primary" >
						Chỉnh sửa sản phẩm
					</Title>}
					className="border-small shadow-sm rounded-3"
				>
					<Row className="d-flex" justify="center">
						<Col xs={24} md={20}>
							<Form layout="vertical" onFinish={handleSubmit} form={form}>
								<Row gutter={16} >
									<Col xs={24} lg={8}>
										<Title level={5}>Tên sản phẩm </Title>
										<Form.Item name="name"
											rules={[{ required: true, message: 'Vui lòng nhập thông tin này!' }]}
										>
											<Input />
										</Form.Item>
									</Col>
									<Col xs={24} lg={8}>
										<Title level={5}>sku </Title>
										<Form.Item name="sku"
											rules={[{ required: true, message: 'Vui lòng nhập thông tin này!' }]}
										>
											<Input />
										</Form.Item>
									</Col>
									<Col xs={24} lg={8}>
										<Title level={5}>unit </Title>
										<Form.Item name="unit"
											rules={[{ required: true, message: 'Vui lòng nhập thông tin này!' }]}
										>
											<Input />
										</Form.Item>
									</Col>
									<Col xs={24} lg={8}>
										<Title level={5}>Discount </Title>
										<Form.Item name="discount"
										>
											<InputNumber min={0} max={1000000} />
										</Form.Item>
									</Col>
									<Col xs={24} lg={8}>
										<Title level={5}>Giá </Title>
										<Form.Item name="price"
											rules={[{ required: true, message: 'Vui lòng nhập thông tin này!' }]}
										>
											<InputNumber min={0} max={1000000} />
										</Form.Item>
									</Col>
									<Col xs={24} lg={8}>
										<Title level={5}>Danh mục </Title>
										<Form.Item name="categoryId">
											<Select showSearch
												placeholder="Chọn danh mục"
											>
												{categories && categories.length > 0 && categories.map(category =>
												(
													<Option key={category.id}
														value={JSON.stringify([category.id])}
													>
														{category.name}
													</Option>
												)
												)}
											</Select>

										</Form.Item>
									</Col>
									<Col xs={24} lg={8}>
										<Title level={5}>Nhà cung cấp </Title>
										<Form.Item name="supplierId">
											<Select showSearch
												placeholder="Chọn nhà cung cấp"
											>
												{suppliers && suppliers.length > 0 && suppliers.map(supplier =>
												(
													<Option key={supplier.id}
														value={JSON.stringify([supplier.id])}
													>
														{supplier.name}
													</Option>
												)
												)}
											</Select>

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
											text="Cập nhật"
											htmlType="submit"
											requesting={requesting}
											withIcon={<SyncOutlined />}
										/>
									</Col>
									<Col>
										<Link to="/product">
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
	);
}

export default UpdateProduct;