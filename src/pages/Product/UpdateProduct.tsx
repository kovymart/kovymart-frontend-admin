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
						Ch???nh s???a s???n ph???m
					</Title>}
					className="border-small shadow-sm rounded-3"
				>
					<Row className="d-flex" justify="center">
						<Col xs={24} md={20}>
							<Form layout="vertical" onFinish={handleSubmit} form={form}>
								<Row gutter={16} >
									<Col xs={24} lg={8}>
										<Title level={5}>T??n s???n ph???m </Title>
										<Form.Item name="name"
											rules={[{ required: true, message: 'Vui l??ng nh???p th??ng tin n??y!' }]}
										>
											<Input />
										</Form.Item>
									</Col>
									<Col xs={24} lg={8}>
										<Title level={5}>sku </Title>
										<Form.Item name="sku"
											rules={[{ required: true, message: 'Vui l??ng nh???p th??ng tin n??y!' }]}
										>
											<Input />
										</Form.Item>
									</Col>
									<Col xs={24} lg={8}>
										<Title level={5}>????n v??? </Title>
										<Form.Item name="unit"
											rules={[{ required: true, message: 'Vui l??ng nh???p th??ng tin n??y!' }]}
										>
											<Input />
										</Form.Item>
									</Col>
									<Col xs={24} lg={8}>
										<Title level={5}>Gi???m gi?? </Title>
										<Form.Item name="discount"
										>
											<InputNumber min={0} max={1000000} />
										</Form.Item>
									</Col>
									<Col xs={24} lg={8}>
										<Title level={5}>Gi?? </Title>
										<Form.Item name="price"
											rules={[{ required: true, message: 'Vui l??ng nh???p th??ng tin n??y!' }]}
										>
											<InputNumber min={0} max={1000000} />
										</Form.Item>
									</Col>
									<Col xs={24} lg={8}>
										<Title level={5}>Danh m???c </Title>
										<Form.Item name="categoryId">
											<Select showSearch
												placeholder="Ch???n danh m???c"
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
										<Title level={5}>Nh?? cung c???p </Title>
										<Form.Item name="supplierId">
											<Select showSearch
												placeholder="Ch???n nh?? cung c???p"
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
										<Title level={5}>M?? t??? </Title>
										<Form.Item name="description"
											rules={[{ required: true, message: 'Vui l??ng nh???p th??ng tin n??y!' }]}
										>
											<TextArea rows={8} />
										</Form.Item>
									</Col>
								</Row>
								<Row className="d-flex mt-5 mb-3" justify="center" gutter={10}>
									<Col>
										<ButtonUI
											text="C???p nh???t"
											htmlType="submit"
											requesting={requesting}
											withIcon={<SyncOutlined />}
										/>
									</Col>
									<Col>
										<Link to="/product">
											<ButtonUI
												variant="secondary"
												text="Quay l???i"
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