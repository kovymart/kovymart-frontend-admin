import { Row, Col, Card, Typography, Form, Input, InputNumber, Select } from 'antd';
import { PlusOutlined } from "@ant-design/icons";
import ButtonUI from '../../components/UIKit/ButtonUI';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addProduct, selectRequesting } from '../../stores/product.slice';
import { CategoryI, ProductI, SupplierI } from '../../types';
import { useEffect } from "react";
import { getCategoryList, selectCategoryList } from '../../stores/category.slice';
import { getSupplierList, selectSupplierList } from '../../stores/supplier.slice';

const { Option } = Select;
const { Title } = Typography;
const { TextArea } = Input;

function AddProduct() {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const categories: Array<CategoryI> = useSelector(selectCategoryList)!;
  const suppliers: Array<SupplierI> = useSelector(selectSupplierList)!;


  const handleSubmit = (e: ProductI) => {

    let newProduct = {
      ...e,
      categoryId: Number(e.categoryId?.toString().replace(/[-/\\^$*+?.()|[\]{}]/g, '')),
      supplierId: Number(e.supplierId?.toString().replace(/[-/\\^$*+?.()|[\]{}]/g, ''))
    };

    dispatch(addProduct(newProduct));
  };

  const requesting = useSelector(selectRequesting);
  useEffect(() => {

    form.setFieldsValue({
      price: 0,
      discount: 0
    });

  }, [form]);

  useEffect(() => {
    dispatch(getCategoryList());
    dispatch(getSupplierList());
  }, [dispatch]);

  return (
    <Card
      style={{ width: "100%" }}
      title={<Title level={4} className="color-primary" >
        Thêm sản phẩm
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
                  text="Thêm"
                  htmlType="submit"
                  withIcon={<PlusOutlined />}
                  requesting={requesting}
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
  );
}

export default AddProduct;